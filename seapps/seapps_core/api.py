import frappe


@frappe.whitelist(allow_guest=True)
def login_via_line() :
	return frappe.form_dict['code']

def add_line_account() :
	return ''
