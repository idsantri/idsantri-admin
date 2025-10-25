<template>
	<temp-object
		:data="dataObj"
		:route="'/ortu/' + dataObj['ID Ortu']"
		:spinner="spinner"
	/>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import TempObject from 'src/pages/santri/relations/TemplateObject.vue';
import { useRoute } from 'vue-router';
import Santri from 'src/models/Santri';

const route = useRoute();
const santriId = route.params.id;
const spinner = ref(false);
const ortu = ref({});

async function loadData() {
	spinner.value = true;
	try {
		const data = await Santri.getOrtu({
			santriId,
			notifySuccess: false,
		});
		if (data) {
			ortu.value = data.ortu;
		}
	} catch (_err) {
		// console.error('err ', _err);
	} finally {
		spinner.value = false;
	}
}

const dataObj = computed(() => ({
	'ID Ortu': ortu.value.id,
	Ayah: ortu.value.ayah,
	Ibu: ortu.value.ibu,
	'Anak ke': `${ortu.value.anak_ke || '?'} dari ${
		ortu.value.jumlah_anak || '?'
	}  bersaudara`,
}));

onMounted(async () => {
	await loadData();
});
</script>
