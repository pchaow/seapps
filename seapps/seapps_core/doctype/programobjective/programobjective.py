# Copyright (c) 2024, SE@UP and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.naming import getseries

from seapps.seapps_core.doctype.program.program import Program

class ProgramObjective(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		code: DF.Data | None
		objective: DF.Text
		program: DF.Link
	# end: auto-generated types

	def before_insert(self) :
		program = frappe.get_doc("Program",self.program)
		prefix = f"{program.program_code}-OBJ"
		self.name = f"{prefix}-{getseries(prefix,3)}"
		self.code = self.name


	pass
