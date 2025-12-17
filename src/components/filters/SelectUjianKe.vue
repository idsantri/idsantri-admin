<template lang="">
	<q-select
		dense
		outlined
		label="Cawu/Semester"
		v-model="ujian_ke"
		:options="lists"
		option-value="value"
		option-label="label"
		emit-value
		map-options
		clearable=""
		behavior="menu"
	/>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import listsMadrasahStore from 'stores/lists-madrasah-store';

const props = defineProps({
	startUrl: {
		type: String,
		required: true,
	},
	arrUjian: {
		type: Array,
		required: true,
	},
	routerPush: {
		type: Boolean,
		default: true,
	},
});

const lists = ref([]);
const { params } = useRoute();
const ujian_ke = ref(params.ujian_ke);
const router = useRouter();
const url = `${props.startUrl}/${params.th_ajaran_h}/${params.tingkat_id}/${params.kelas}`;

onMounted(() => {
	if (params.th_ajaran_h && params.tingkat_id && params.kelas) {
		lists.value = listsMadrasahStore().getUjian.filter((u) => props.arrUjian.includes(u.value));
	}
});

watch(ujian_ke, (newValue, oldValue) => {
	if (!props.routerPush) {
		return;
	} else {
		if (!newValue) {
			router.push(url);
			return;
		}
		if (newValue != oldValue) {
			router.push(`${url}/${newValue}`);
			return;
		}
	}
});
</script>
<style lang=""></style>
