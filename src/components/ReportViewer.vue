<template lang="">
	<q-card style="width: 100%; height: 90%">
		<q-card-section style="width: 100%; height: 100%" class="q-pa-sm">
			<iframe
				:src="api.defaults.baseURL + '/' + `${props.url}&token=${token}`"
				style="height: 100%; width: 100%"
				frameborder="0"
				loading="lazy"
				scrolling="no"
				seamless="seamless"
			>
			</iframe>
		</q-card-section>
	</q-card>
</template>
<script setup>
import api from 'src/api';
import useAuthStore from 'src/stores/auth-store';

const props = defineProps({ url: String });
const token = useAuthStore().token || '';
</script>
<style lang=""></style>
