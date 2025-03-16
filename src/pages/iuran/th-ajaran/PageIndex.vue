<template lang="">
	<HeadFilterThAjaran
		start-url="/iuran/th-ajaran"
		@data-filter="(val) => (dataFilter = val)"
	/>
	<div v-if="!params.thAjaranH">not params</div>

	<div v-else>tahun ajaran</div>
</template>
<script setup>
import HeadFilterThAjaran from 'src/pages/bendahara/HeadFilterThAjaran.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const dataFilter = ref({});

const { params } = useRoute();
</script>
<style lang=""></style>
