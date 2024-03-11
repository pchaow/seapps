// Copyright (c) 2024, SE@UP and contributors
// For license information, please see license.txt

frappe.ui.form.on("StudentProject", {
	refresh(frm) {

		console.log(frm)

		let user_filter = {
			filters: {
				"ignore_user_type": 1
			}
		}

		frm.fields_dict['operators'].grid.get_field('operator').get_query = user_filter
		frm.fields_dict['advisor'].grid.get_field('advisor').get_query = user_filter
	},
});
