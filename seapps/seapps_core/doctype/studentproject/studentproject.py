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
		from seapps.seapps_core.doctype.projectfile.projectfile import ProjectFile
		from seapps.seapps_core.doctype.projectoperator.projectoperator import ProjectOperator

		advisor: DF.Table[ProjectAdvisor]
		company_text: DF.Data | None
		files: DF.Table[ProjectFile]
		operators: DF.Table[ProjectOperator]
		project_descriptoin: DF.LongText | None
		project_evaluate: DF.Literal["A", "B+", "B", "C+", "C", "D+", "D", "F", "I", "S", "U"]
		project_name: DF.Data
		semester: DF.Link
		subject_text: DF.Data | None
		สถานะเอกสาร: DF.Literal["\u0e2a\u0e23\u0e49\u0e32\u0e07", "\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19", "\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34", "\u0e40\u0e2a\u0e23\u0e47\u0e08\u0e2a\u0e34\u0e49\u0e19", "\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01"]
	# end: auto-generated types

	pass
