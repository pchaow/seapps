// Copyright (c) 2024, test and contributors
// For license information, please see license.txt

frappe.ui.form.on("Line Notify", {
	refresh(frm) {
		console.log(frm)
	},

	send_message(frm) {
		if (frm.is_dirty() == false) {
			frappe.call("seapps.seapps_line.doctype.line_notify.line_notify.send_message", {
				name: frm.doc.name
			})
		}

	}


});
