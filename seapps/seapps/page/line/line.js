frappe.pages["line"].on_page_load = function (wrapper) {
	frappe.ui.make_app_page({
		parent: wrapper,
		title: __("line"),
		single_column: true,
	});
};

frappe.pages["line"].on_page_show = function (wrapper) {
	load_desk_page(wrapper);
};

function load_desk_page(wrapper) {
	let $parent = $(wrapper).find(".layout-main-section");
	$parent.empty();

	frappe.require("line.bundle.js").then(() => {
		frappe.line = new frappe.ui.Line({
			wrapper: $parent,
			page: wrapper.page,
		});
	});
}