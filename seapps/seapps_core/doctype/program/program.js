// Copyright (c) 2024, SE@UP and contributors
// For license information, please see license.txt
function make_table(doctype, fieldName, show_fields,parent_values,add_fields, update_fields) {

	let title = "เพิ่มรายการ"
	function make_add_button_function(doctype, title, add_fields, parent_values, reload_callback) {
	frappe.model.with_doctype(doctype, (r) => {

		let meta = frappe.get_meta(doctype)

		let df = new frappe.ui.Dialog({
			title: title,
			fields: [
				...(meta.fields.filter(f => add_fields.find(x => x === f.fieldname))),
			],
			size: 'small', // small, large, extra-large
			primary_action_label: 'Submit',
			primary_action: async (values) => {

				let val = {
					...values,
					...parent_values
				}

				await fetch(`/api/resource/${doctype}/`, {
					method: "POST",
					body: JSON.stringify(val)
				})
				df.hide();
				reload_callback()

			}

		})
		df.show()
	})

}


	let self = (frm) => {
		frappe.model.with_doctype(doctype, (r) => {

			let meta = frappe.get_meta(doctype)

			// console.log(meta)


			let fields = [
				...(meta.fields.filter(x => show_fields.find(f => x.fieldname === f)).map(x => {
					return {
						id: x.fieldname,
						name: x.label,
						width: x.columns === "" ? 1 : x.columns
					}
				})),
//                { id: 'edit_btn', name: '', width: 2 }
			]

			// console.log("fields", JSON.stringify(fields))
			let self = () => {
				frappe.db.get_list(doctype, {
					fields: "*",
					filters: parent_values
				}).then(docs => {

					let data = docs.sort((a, b) => a.name < b.name ? -1 : 1)

					// console.log("data", JSON.stringify(data))


					let template = `
			<div class="form-group">
				<button class="btn btn-xs btn-default" data-fieldtype="AddButton" data-fieldname="{{fieldname}}" placeholder="" value="">เพิ่มรายการ</button>
			</div>
            <div class="form-grid">
                <div class="grid-heading-row">
                    <div class="grid-row">
                        <div class="data-row row">
							<div class="row-check sortable-handle col">
								<input type="checkbox" data-fieldname="{{fieldname}}" class="grid-row-check">
							</div>

                            {% for col in columns %}
                            <div class="grid-static-col col row-index col-xs-{{col['width']}}  ">
                                <span>{{col['name']}}</span>
                            </div>
                            {% endfor %}
                            <div class="col grid-static-col d-flex justify-content-center" style="cursor: pointer;">
                            <a><svg class="icon  icon-sm" style="filter: opacity(0.5)" aria-hidden="true">
                            <use class="" href="#icon-setting-gear"></use>
                            </svg></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid-body">
                    {% for row in rows %}
                    <div class="rows">
                        <div class="grid-row">
                            <div class="data-row row">

	                            <div class="row-check sortable-handle col">
									<input type="checkbox" class="grid-row-check" data-name="{{row['name']}}">
								</div>
                                {% for col in columns %}
                                <div class="sortable-handle text-left col col-xs-{{col['width']}} {% if col['id'] =='name' %} bold {%endif%}">
                                    {% if col['id'] == 'edit_btn' %}
                                    <button class="btn btn-xs btn-default" data-fieldtype="Button" placeholder="" data-doctype="{{doctype}}" value="">แก้ไข</button>
                                    {% else %}

                                    {% if col['id'] == 'name' %}
                                    <a class="text-underline"><span>{{row[col['id']]}}</span></a>

                                    {% else %}
                                    <span>{{row[col['id']]}}</span>
                                    {% endif %}

                                    {% endif %}
                                </div>
                                {% endfor %}

                                <div class="col"><div class="btn-open-row" data-toggle="tooltip" data-placement="right" title="" data-original-title="Edit" aria-describedby="tooltip56951">
									<a class="edit_row" data="{{row.name}}">
									<svg data="{{row.name}}" class="icon  icon-xs" style="" aria-hidden="true">
									<use class="" href="#icon-edit"></use></svg></a>
									</div></div>
                            </div>
                        </div>
                    </div>
                    {% endfor %}
                </div>
            </div>`

					frm.set_df_property(fieldName, 'options', frappe.render(template, {
						columns: fields,
						rows: data,
						doctype: doctype,
						fieldname: fieldName,
					}))
					$(`[data-fieldtype=AddButton][data-fieldname=${fieldName}]`).unbind('click')
					$(`[data-fieldtype=AddButton][data-fieldname=${fieldName}]`).click(async (e) => {
						make_add_button_function(doctype, title, add_fields, parent_values, () => self(frm))
					})

					$(`[data-fieldname=${fieldName}] .grid-row-check`).unbind('click')
					$(`[data-fieldname=${fieldName}] .grid-row-check`).click(async (e) => {
						console.log(e)
						let object = $(e.target)
						let is_heading = $(object).parents(".grid-heading-row").length === 1
						console.log(is_heading, object.prop('checked'))
						if (is_heading) {
							$(`[data-fieldname=${fieldName}] .grid-row-check`).prop('checked', object.prop('checked'))
						}

					})

					$(`[data-fieldname=${fieldName}] .edit_row`).unbind('click')
					$(`[data-fieldname=${fieldName}] .edit_row`).click(async (x) => {

						let name = $(x.target).attr('data')
						// alert(name)
						let objdoc = await frappe.db.get_doc(doctype, name)
						let df = new frappe.ui.Dialog({
							title: `แก้ไขวัตถุประสงค์ ${name}`,
							fields: [
								...(meta.fields.filter(x => update_fields.find(f => x.fieldname == f)).map(x => {
									return {
										...x,
										default: objdoc[x.fieldname]
									}
								})),
							],
							size: 'small', // small, large, extra-large
							primary_action_label: 'Submit',
							primary_action: async (values) => {

								await fetch(`/api/resource/${doctype}/${name}`, {
									method: "PUT",
									body: JSON.stringify(values)
								})

								self(frm)

								df.hide();
							}

						})

						df.add_custom_action("Delete", async () => {
							await fetch(`/api/resource/${doctype}/${name}`, {
								method: "DELETE"
							})
							df.hide()
							self(frm)
						}, "btn-danger")
						console.log(x.target)
						console.log(df)

						df.show()
					})

				})
			}
			self()
		})

	}
	return self
}



frappe.ui.form.on("Program", {
	refresh(frm) {

		let parent_values = {
			program: frm.doc.name
		}

		let refreshObjective = make_table('ProgramObjective', 'objective_table', ['code', 'objective'],parent_values, ['objective'],['objective'])
		let refreshElo = make_table('ProgramLearningOutcome', 'lo_datatable', ['code', 'lo_description'],parent_values,['lo_description'], ['lo_description'])

		refreshObjective(frm)
		refreshElo(frm)
	},
	async btn_add_objective(frm) {
		let doctype = 'ProgramObjective'
		let title = 'เพิ่มวัตถุประสงค์'
		let add_fields = ['objective']
		let parent_values = {
			program: frm.doc.name
		}
		make_add_button_function(doctype, title, add_fields, parent_values, () => refreshObjective(frm))

	},
	async btn_add_elo(frm) {

		let doctype = 'ProgramLearningOutcome'
		let title = 'เพิ่มผลการเรียนรู้'
		let add_fields = ['lo_description']
		let parent_values = {
			program: frm.doc.name
		}
		make_add_button_function(doctype, title, add_fields, parent_values, () => refreshElo(frm))

	}

});
