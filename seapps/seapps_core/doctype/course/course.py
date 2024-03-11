# Copyright (c) 2024, SE@UP and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Course(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		code: DF.Data | None
		course_code: DF.Data
		course_desc_en: DF.Text | None
		course_desc_th: DF.Text | None
		course_name_en: DF.Data
		course_name_th: DF.Data
		course_objective: DF.TextEditor | None
		course_type: DF.Link
		credit: DF.Int
		credit_assign: DF.Data
		program: DF.Link
		remark: DF.Text | None
	# end: auto-generated types

	pass
