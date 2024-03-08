# Copyright (c) 2024, SE@UP and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.naming import getseries


class ProgramLearningOutcome(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		lo_description: DF.Text
		program: DF.Link
	# end: auto-generated types

	def autoname(self) :
		program = frappe.get_doc("Program",self.program)
		prefix = f"{program.program_code}-ELO"
		self.name = f"{prefix}-{getseries(prefix,3)}"
	pass
