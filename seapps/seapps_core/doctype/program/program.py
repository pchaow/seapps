# Copyright (c) 2024, SE@UP and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Program(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		adapt_from: DF.Link | None
		is_new_program: DF.Check
		program_code: DF.Data
		program_name: DF.Data
		program_type: DF.Literal["\u0e2b\u0e25\u0e31\u0e01\u0e2a\u0e39\u0e15\u0e23\u0e1b\u0e01\u0e15\u0e34", "\u0e2b\u0e25\u0e31\u0e01\u0e2a\u0e39\u0e15\u0e23\u0e23\u0e30\u0e22\u0e30\u0e2a\u0e31\u0e49\u0e19 (Non-Degree)", "\u0e2b\u0e25\u0e31\u0e01\u0e2a\u0e39\u0e15\u0e23\u0e25\u0e48\u0e27\u0e07\u0e2b\u0e19\u0e49\u0e32 (Pre-Degree)"]
		program_year: DF.Data
	# end: auto-generated types

	pass
