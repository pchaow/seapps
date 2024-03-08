// Copyright (c) 2024, SE@UP and contributors
// For license information, please see license.txt

function refreshObjective(frm) {

	frappe.model.with_doctype('ProgramObjective', (r) => {

		let meta = frappe.get_meta("ProgramObjective")
		// console.log(meta)
		let showFields = [
			'objective'
		]
		let fields = [
			{id: 'name', name: 'Name', width: 2},
			...(meta.fields.filter(x => showFields.find(f => x.fieldname == f)).map(x => {
				return {id: x.fieldname, name: x.label, width: x.columns == "" ? 1 : x.columns}
			})),
//                { id: 'edit_btn', name: '', width: 2 }
		]

		// console.log("fields", JSON.stringify(fields))
		frappe.db.get_list("ProgramObjective", {
			fields: "*",
			filters: {program: frm.doc.name}
		}).then(docs => {

			let data = docs.sort((a, b) => a.name < b.name ? -1 : 1)

			// console.log("data", JSON.stringify(data))


			let template = `
            <div class="form-grid">
                <div class="grid-heading-row">
                    <div class="grid-row">
                        <div class="data-row row">
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
                                {% for col in columns %}
                                <div class="sortable-handle text-left col col-xs-{{col['width']}} {% if col['id'] =='name' %} bold {%endif%}">
                                    {% if col['id'] == 'edit_btn' %}
                                    <button class="btn btn-xs btn-default" data-fieldtype="Button" placeholder="" data-doctype="Program" value="">แก้ไข</button>
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
									<a class="program_objective" data="{{row.name}}">
									<svg data="{{row.name}}" class="icon  icon-xs" style="" aria-hidden="true">
									<use class="" href="#icon-edit"></use></svg></a>
									</div></div>
                            </div>
                        </div>
                    </div>
                    {% endfor %}
                </div>
            </div>`

			frm.set_df_property('datatable', 'options', frappe.render(template, {
				columns: fields,
				rows: data
			}))


			$(".program_objective").unbind('click')
			$(".program_objective").click(async (x) => {

				let name = $(x.target).attr('data')
				// alert(name)
				// console.log(x.target)
				let objdoc = await frappe.db.get_doc('ProgramObjective', name)
				let df = new frappe.ui.Dialog({
					title: `แก้ไขวัตถุประสงค์ ${name}`,
					fields: [
						{
							label: 'วัตถุประสงค์',
							fieldname: 'objective',
							fieldtype: 'Text',
							default: objdoc['objective']
						},
					],
					size: 'small', // small, large, extra-large
					primary_action_label: 'Submit',
					primary_action: async (values) => {

						await fetch(`/api/resource/ProgramObjective/${name}`, {
							method: "PUT",
							body: JSON.stringify(values)
						})

						refreshObjective(frm)

						df.hide();
					}

				})

				df.show()
			})

		})

	})

}

function refreshElo(frm) {

	let doctype = 'ProgramLearningOutcome'

	frappe.model.with_doctype(doctype, (r) => {

		let meta = frappe.get_meta(doctype)
		// console.log(meta)
		let showFields = [
			'lo_description'
		]
		let fields = [
			{id: 'name', name: 'Name', width: 2},
			...(meta.fields.filter(x => showFields.find(f => x.fieldname == f)).map(x => {
				return {id: x.fieldname, name: x.label, width: x.columns == "" ? 1 : x.columns}
			})),
//                { id: 'edit_btn', name: '', width: 2 }
		]

		// console.log("fields", JSON.stringify(fields))
		frappe.db.get_list(doctype, {
			fields: "*",
			filters: {program: frm.doc.name}
		}).then(docs => {

			let data = docs.sort((a, b) => a.name < b.name ? -1 : 1)

			// console.log("data", JSON.stringify(data))


			let template = `
            <div class="form-grid">
                <div class="grid-heading-row">
                    <div class="grid-row">
                        <div class="data-row row">
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
                                {% for col in columns %}
                                <div class="sortable-handle text-left col col-xs-{{col['width']}} {% if col['id'] =='name' %} bold {%endif%}">
                                    {% if col['id'] == 'edit_btn' %}
                                    <button class="btn btn-xs btn-default" data-fieldtype="Button" placeholder="" data-doctype="Program" value="">แก้ไข</button>
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
									<a class="learning_outcome" data="{{row.name}}">
									<svg data="{{row.name}}" class="icon  icon-xs" style="" aria-hidden="true">
									<use class="" href="#icon-edit"></use></svg></a>
									</div></div>
                            </div>
                        </div>
                    </div>
                    {% endfor %}
                </div>
            </div>`

			frm.set_df_property('lo_datatable', 'options', frappe.render(template, {
				columns: fields,
				rows: data
			}))


			$(".learning_outcome").unbind('click')
			$(".learning_outcome").click(async (x) => {

				let name = $(x.target).attr('data')
				// alert(name)
				// console.log(x.target)
				let objdoc = await frappe.db.get_doc(doctype, name)
				let df = new frappe.ui.Dialog({
					title: `แก้ไขผลการเรียนรู้ที่คาดหวัง ${name}`,
					fields: [
						{
							label: 'ผลการเรียนรู้',
							fieldname: 'lo_description',
							fieldtype: 'Text',
							default: objdoc['lo_description']
						},
					],
					size: 'small', // small, large, extra-large
					primary_action_label: 'Submit',
					primary_action: async (values) => {

						await fetch(`/api/resource/${doctype}/${name}`, {
							method: "PUT",
							body: JSON.stringify(values)
						})

						refreshElo(frm)

						df.hide();
					}

				})

				df.show()
			})

		})

	})

}


frappe.ui.form.on("Program", {
	refresh(frm) {
		refreshObjective(frm)
		refreshElo(frm)
	},
	async btn_add_objective(frm) {

		frappe.model.with_doctype('ProgramObjective', (r) => {

			let meta = frappe.get_meta("ProgramObjective")

			let df = new frappe.ui.Dialog({
				title: 'เพิ่มวัตถุประสงค์',
				fields: [
					{
						label: 'วัตถุประสงค์',
						fieldname: 'objective',
						fieldtype: 'Text'
					},
				],
				size: 'small', // small, large, extra-large
				primary_action_label: 'Submit',
				primary_action: async (values) => {

					let val = {
						...values,
						program: frm.doc.name
					}

					await fetch(`/api/resource/ProgramObjective/`, {
						method: "POST",
						body: JSON.stringify(val)
					})

					refreshObjective(frm)

					df.hide();
				}

			})
			df.show()
		})

	},
	async btn_add_elo(frm) {

		let doctype = 'ProgramLearningOutcome'
		frappe.model.with_doctype(doctype, (r) => {

			let meta = frappe.get_meta(doctype)

			let df = new frappe.ui.Dialog({
				title: 'เพิ่มผลการเรียนรู้ที่คาดหวัง',
				fields: [
					{
						label: 'ผลการเรียนรู้',
						fieldname: 'lo_description',
						fieldtype: 'Text'
					},
				],
				size: 'small', // small, large, extra-large
				primary_action_label: 'Submit',
				primary_action: async (values) => {

					let val = {
						...values,
						program: frm.doc.name
					}

					await fetch(`/api/resource/${doctype}/`, {
						method: "POST",
						body: JSON.stringify(val)
					})

					refreshElo(frm)

					df.hide();
				}

			})
			df.show()
		})

	}

});
