<template>
	<temp-object
		:data="dataObj"
		:route="'/ortu/' + dataObj['ID Ortu']"
		:spinner="spinner"
	/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TempObject from 'src/pages/santri/relations/TemplateObject.vue';
import { useRoute } from 'vue-router';
import apiGet from 'src/api/api-get';

const route = useRoute();
const santriId = route.params.id;
const spinner = ref(false);
const dataObj = ref({});

onMounted(async () => {
	const { ortu } = await apiGet({
		endPoint: `santri/${santriId}/ortu`,
		loading: spinner,
	});
	if (!ortu) return;
	dataObj.value = {
		'ID Ortu': ortu.id,
		Ayah: ortu.ayah,
		Ibu: ortu.ibu,
		'Anak ke': `${ortu.anak_ke || '?'} dari ${
			ortu.jumlah_anak || '?'
		}  bersaudara`,
	};
});
</script>
