# Copyright (c) 2024, SE@UP and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class ProjectAdvisor(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		advisor: DF.Link | None
		level: DF.Literal["\u0e17\u0e35\u0e48\u0e1b\u0e23\u0e36\u0e01\u0e29\u0e32\u0e2b\u0e25\u0e31\u0e01", "\u0e17\u0e35\u0e48\u0e1b\u0e23\u0e36\u0e01\u0e29\u0e32\u0e23\u0e48\u0e27\u0e21", "\u0e01\u0e23\u0e23\u0e21\u0e01\u0e32\u0e23"]
		parent: DF.Data
		parentfield: DF.Data
		parenttype: DF.Data
	# end: auto-generated types

	pass
