# Copyright (c) 2024, test and contributors
# For license information, please see license.txt
import frappe
# import frappe
from frappe.utils.nestedset import NestedSet


class ProgramAlignment(NestedSet):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		display: DF.Data | None
		is_group: DF.Check
		key: DF.Data
		lft: DF.Int
		old_parent: DF.Link | None
		parent_programalignment: DF.Link | None
		program: DF.Link | None
		rgt: DF.Int
		value: DF.Data
	# end: auto-generated types

	def before_save(self):
		if self.parent_doc :
			parent_program = frappe.get_doc("ProgramAlignment",self.parent_doc)
			if parent_program :
				self.parent = parent_program

		self.display = f"{self.program} : {self.key} - {self.value}"

	pass
