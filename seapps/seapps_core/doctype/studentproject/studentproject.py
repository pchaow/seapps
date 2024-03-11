# Copyright (c) 2024, SE@UP and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class StudentProject(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF
		from seapps.seapps_core.doctype.projectadvisor.projectadvisor import ProjectAdvisor
		from seapps.seapps_core.doctype.projectoperator.projectoperator import ProjectOperator

		advisor: DF.Table[ProjectAdvisor]
		project_descriptoin: DF.LongText | None
		project_name: DF.Data
		project_operators: DF.Table[ProjectOperator]
		semester: DF.Link
	# end: auto-generated types

	pass
