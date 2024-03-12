<script setup>
import {ref} from "vue";

const login_url = ref(null)
const line_connect = ref(null)

const load_line_connect = async () => {
	let result = await frappe.call("seapps.seapps_line.api.load_line_connect")
	line_connect.value = result.message
}

const load_providers = async () => {
	let result = await frappe.call("seapps.seapps_line.api.get_line_social_key", {})
	console.log(result)
	login_url.value = result.message.auth_url

	console.log(login_url.value)

}

const disconnect = async () => {
	let result = await frappe.call("seapps.seapps_line.api.disconnect_line")
	if (result.message) {
		line_connect.value = null
	}
}

Promise.all([load_providers(), load_line_connect()]).then(x => {
	console.log('load all finished')
})

</script>
<template>
	<div>
		<h4>Your Current Line Integration</h4>

		<div class="" v-if="line_connect">
			<table class="table table-striped table-hover">
				<thead>
				<tr>
					<th>Key</th>
					<th>Value</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td> Line UID :</td>
					<td> {{line_connect.userid}}</td>
				</tr>
				<tr>
					<td> Line Email :</td>
					<td> {{line_connect.username}}</td>
				</tr>

				</tbody>
			</table>
		</div>

		<div v-if="login_url">
			<a v-if="!line_connect" class="btn line-button" :href="login_url">
				<span class="logo"><img src="/assets/seapps/js/line/line.png" width="40" height="40"/></span>
				<span class="label">Connect To Line</span>
			</a>
			<button v-else class="btn line-button" @click="disconnect">
				<span class="logo"><img src="/assets/seapps/js/line/line.png" width="40" height="40"/></span>
				<span class="label">Disconnect from Line</span>
			</button>
		</div>
	</div>
</template>

<style scoped>
.line-button {
	background-color: #06C755;
	color :white;
	font-size: large;
	font-weight: bold;
}

.line-button :hover {
}

.line-button span.label {
	padding : 20px;
}
</style>
