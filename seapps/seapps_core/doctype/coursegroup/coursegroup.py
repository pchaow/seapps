# Copyright (c) 2024, SE@UP and contributors
# For license information, please see license.txt

# import frappe
from frappe.utils.nestedset import NestedSet


class CourseGroup(NestedSet):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		course_type: DF.Data
		is_group: DF.Check
		lft: DF.Int
		old_parent: DF.Link | None
		parent_coursegroup: DF.Link | None
		program: DF.Link | None
		rgt: DF.Int
	# end: auto-generated types

	pass
