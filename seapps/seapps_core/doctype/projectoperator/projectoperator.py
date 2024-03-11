# Copyright (c) 2024, SE@UP and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class ProjectOperator(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		level: DF.Literal["\u0e2b\u0e31\u0e27\u0e2b\u0e19\u0e49\u0e32\u0e42\u0e04\u0e23\u0e07\u0e01\u0e32\u0e23", "\u0e1c\u0e39\u0e49\u0e23\u0e48\u0e27\u0e21\u0e42\u0e04\u0e23\u0e07\u0e01\u0e32\u0e23"]
		operator: DF.Link | None
		parent: DF.Data
		parentfield: DF.Data
		parenttype: DF.Data
	# end: auto-generated types

	pass
