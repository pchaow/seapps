# Copyright (c) 2024, test and contributors
# For license information, please see license.txt
import json

import frappe
import requests
from frappe.model.document import Document


class LineNotify(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		amended_from: DF.Link | None
		message: DF.Text
		send_to_user: DF.Link
	# end: auto-generated types

	def on_submit(self):
		user: LineConnect = frappe.get_doc("LineConnect", self.send_to_user)
		access_token = frappe.get_doc("Line Configuration").message_api_token

		if access_token:
			data = {
				"to": user.userid,
				"messages": [
					{
						"type": "text",
						"text": self.message
					}
				]
			}
			headers = {
				'Authorization': "Bearer " + access_token,
				'Content-Type': "application/json"
			}

			result = requests.post("https://api.line.me/v2/bot/message/push",
								   data=json.dumps(data), headers=headers)

			frappe.log(f"LineNotify@on_submit send message result {result.json()}")
		else:
			frappe.log(f"LineNotify@on_submit access token is null or empty")

	pass


@frappe.whitelist()
def send_message():
	doc = frappe.get_doc("Line Notify", frappe.form_dict['name'])
	user: LineConnect = frappe.get_doc("LineConnect", doc.send_to_user)

	# frappe.msgprint("test", f"{doc.name} - {doc.message} - {user.userid}")
	access_token = frappe.get_doc("Line Configuration").message_api_token

	if not access_token:
		frappe.throw("Please config message api token in Line Configuration")
	else:

		data = {
			"to": user.userid,
			"messages": [
				{
					"type": "text",
					"text": doc.message
				}
			]
		}
		headers = {
			'Authorization': "Bearer " + access_token,
			'Content-Type': "application/json"
		}

		frappe.msgprint(json.dumps(data), "data dump")

		result = requests.post("https://api.line.me/v2/bot/message/push", data=json.dumps(data),
							   headers=headers)

		frappe.msgprint("RESULT : " + json.dumps(result.json()), "post result")
	pass
