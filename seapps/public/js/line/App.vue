<script setup>
import {ref} from "vue";

const dynamicMessage = ref("Hello from App.vue");
const login_url = ref()
const load_providers = async () => {
	let result = await frappe.call("seapps.seapps_core.api.get_line_social_key", {})
	console.log(result)
	login_url.value = result.message.auth_url

	console.log(login_url.value)

}

load_providers()
</script>
<template>
	<div>
		<h3>{{ dynamicMessage }}</h3>
		<h4>Start editing at seapps/public/js/line/App.vue</h4>

		<div v-if=login_url>
			<a :href="login_url">Line Integration</a>
			<div>{{ login_url }}</div>
		</div>
	</div>
</template>
