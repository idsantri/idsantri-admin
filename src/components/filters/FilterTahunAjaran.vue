<template lang="">
	<q-card>
		<q-card-section class="q-px-sm q-py-sm bg-green-11">
			<q-toolbar class="no-padding" style="min-height: 0">
				<q-toolbar-title class="text-subtitle1">
					<div class="text-subtitle2 text-weight-bold">
						Filter Tahun Ajaran
					</div>
				</q-toolbar-title>
				<slot></slot>
			</q-toolbar>
		</q-card-section>
		<q-card-section class="no-padding">
			<div class="row" style="max-width: 1000px; width: 100%">
				<InputSelectArray
					class="col-12 col-md-4 q-pa-sm"
					v-model="thAjaranH"
					url="tahun-ajaran"
					label="Tahun Ajaran"
					sort="desc"
				/>
			</div>
		</q-card-section>
	</q-card>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';

const props = defineProps({
	startUrl: String,
});
const emit = defineEmits(['dataFilter']);

const { params } = useRoute();
const router = useRouter();
const thAjaranH = ref(params.thAjaranH);

onMounted(async () => {
	sendEmit();
});

function sendEmit() {
	const data = {
		display: thAjaranH.value
			? '➡️ Tahun Ajaran: <strong>' + thAjaranH.value + '</strong>'
			: '<div class="text-green-13 text-italic">Tentukan filter!</div>',
	};

	emit('dataFilter', data);
}

watch(thAjaranH, (newValue, oldValue) => {
	if (!newValue) {
		router.push(`${props.startUrl}`);
		return;
	}
	if (newValue != oldValue) {
		router.push(`${props.startUrl}/${newValue}`);
		return;
	}
});
</script>
<style lang=""></style>
