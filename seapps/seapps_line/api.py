import frappe
import frappe.utils
from frappe import _
from frappe.auth import LoginManager
from frappe.rate_limiter import rate_limit
from frappe.utils import cint, get_url

from frappe.utils.oauth import get_info_via_oauth, update_oauth_user

from frappe.utils.data import escape_html
from frappe.utils.html_utils import get_icon_html
from frappe.utils.jinja import guess_is_path
from frappe.utils.oauth import get_oauth2_authorize_url, get_oauth_keys, redirect_post_login
from frappe.utils.password import get_decrypted_password
from frappe.website.utils import get_home_page

import json
import base64


@frappe.whitelist(allow_guest=True)
def get_line_social_key():
	try:
		provider = frappe.get_doc("Social Login Key", "line_integration")
		client_secret = get_decrypted_password("Social Login Key", provider.name, "client_secret")
		auth_url = get_oauth2_authorize_url(provider.name, "/")

	except:
		pass

	return {
		'provider': provider,
		'auth_url': auth_url
	}


@frappe.whitelist(allow_guest=True)
def line_login(code: str, state: str):
	decoder = decoder_compat
	provider = 'line'
	info = get_info_via_oauth(provider, code, decoder, id_token=True)

	lineconnect_docs = frappe.get_list("LineConnect", fields="*", filters={
		'userid': info['sub']
	}, ignore_permissions=True)

	if len(lineconnect_docs) == 1:
		# login
		data = info
		if isinstance(data, str):
			data = json.loads(data)

		if isinstance(state, str):
			state = base64.b64decode(state)
			state = json.loads(state.decode("utf-8"))

		if not (state and state["token"]):
			frappe.respond_as_web_page(_("Invalid Request"), _("Token is missing"),
									   http_status_code=417)
			return
		user = frappe.get_doc("User", lineconnect_docs[0].user, ignore_permissions=True)

		frappe.local.login_manager.user = user.name
		frappe.local.login_manager.post_login()

		redirect_to = state.get("redirect_to")
		redirect_post_login(
			desk_user=frappe.local.response.get("message") == "Logged In",
			redirect_to="/",
			provider=provider,
		)

		pass
	elif len(lineconnect_docs) == 0:
		# signup
		login_oauth_user(info, provider=provider, state=state)
		pass
	else:
		# error
		frappe.throw("line account duplicate please contact administrator")
		pass


@frappe.whitelist()
def add_line_account(code: str, state: str):
	decoder = decoder_compat
	provider = 'line_integration'
	info = get_info_via_oauth(provider, code, decoder, id_token=True)
	user = frappe.session.user

	lineconnect_docs = frappe.get_list("LineConnect", fields="*", filters={
		"user": user
	})

	if len(lineconnect_docs) <= 0:
		line_connect = frappe.new_doc("LineConnect")
		line_connect.name = frappe.session.user
		line_connect.user = frappe.session.user
		line_connect.owner = frappe.session.user

		line_connect.username = info['email']
		line_connect.userid = info['sub']
		line_connect.insert()
		frappe.db.commit()
	else:

		line_connect = frappe.get_doc("LineConnect", lineconnect_docs[0].name)
		line_connect.username = info['email']
		line_connect.userid = info['sub']
		line_connect.save()
		frappe.db.commit()
	frappe.local.response['type'] = 'redirect'
	frappe.local.response['location'] = '/app/line'


def decoder_compat(b):
	# https://github.com/litl/rauth/issues/145#issuecomment-31199471
	return json.loads(bytes(b).decode("utf-8"))


@frappe.whitelist()
def load_line_connect():
	lineConnect = frappe.get_list("LineConnect", filters={
		'user': frappe.session.user
	}, fields="*")

	return lineConnect[0] if len(lineConnect) > 0 else None


@frappe.whitelist()
def disconnect_line():
	lineConnect = load_line_connect()
	if lineConnect:
		lineConnect = frappe.get_doc("LineConnect", lineConnect.name)
		lineConnect.user = None
		lineConnect.save()
		frappe.db.commit()
		return True
	else:
		return False
