<template>
	<div class="text-subtitle2">
		{{ props.title }}
	</div>
	<div class="text-overline q-mt-sm">Orang Tua</div>

	<q-input
		hint=""
		dense
		class=""
		outlined
		label="ID Orang Tua*"
		v-model="ortu_id"
	>
		<template v-slot:append>
			<q-btn
				dense
				flat
				color="green-10"
				icon="content_paste"
				@click="pasteOrtu()"
				label="Tempel"
				no-caps=""
			/>
		</template>
		<template v-slot:after>
			<q-btn
				label="Cari"
				no-caps=""
				outline=""
				icon="search"
				class="slot-after text-green-10"
				@click="searchOrtu = true"
			/>
		</template>
	</q-input>

	<q-input
		hint=""
		dense
		class="q-mt-sm"
		outlined
		label="Nama Orang Tua"
		:model-value="ortu?.ayah + ' | ' + ortu?.ibu"
		readonly=""
		:loading="loading['ortu']"
	>
		<template v-slot:after>
			<q-btn
				class="slot-after text-green-10"
				label="Cek"
				no-caps=""
				outline=""
				icon="visibility"
				@click="check('ortu', ortu_id)"
			/>
		</template>
	</q-input>

	<q-input hint="" dense class="" outlined label="Anak ke?" v-model="anak_ke">
		<template #after>
			<div class="text-body2 slot-after">
				dari {{ ortu?.jumlah_anak || '?' }} bersaudara
			</div>
		</template>
	</q-input>

	<div class="text-overline q-mt-sm">Wali</div>
	<q-input
		hint=""
		dense
		class="q-mt-sm"
		outlined
		label="ID Wali*"
		v-model="wali_id"
	>
		<template v-slot:append>
			<q-btn
				dense
				flat
				color="green-10"
				icon="content_paste"
				label="Tempel"
				no-caps=""
				@click="pasteWali()"
			/>
		</template>
		<template v-slot:after>
			<q-btn
				class="slot-after text-green-10"
				no-caps=""
				outline=""
				icon="search"
				label="Cari"
				@click="searchWali = true"
			/>
		</template>
	</q-input>

	<q-input
		hint=""
		dense
		class="q-mt-sm"
		outlined
		label="Nama Wali"
		:model-value="wali?.nama + ' (' + wali?.sex + ')'"
		readonly=""
		:loading="loading['wali']"
	>
		<template v-slot:after>
			<q-btn
				class="slot-after text-green-10"
				no-caps=""
				outline=""
				label="Cek"
				icon="visibility"
				@click="check('wali', wali_id)"
		/></template>
	</q-input>
	<input-select-array
		v-model="wali_status"
		url="hubungan-wali"
		label="Status Wali*"
		class="q-mt-sm"
		hint="Hubungan dengan wali"
		:rules="[(val) => !!val || 'Harus diisi!']"
	/>
</template>
<script setup>
import { onMounted, reactive, ref, toRefs, watch } from 'vue';
import dialogStore from 'src/stores/dialog-store';
import santriState from 'src/stores/santri-store';
import apiGet from 'src/api/api-get';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';

const props = defineProps({
	title: { type: String, default: '' },
});
const { santri } = santriState();
const { ortu_id, anak_ke, wali_id, wali_status } = toRefs(santri);

const dialog = dialogStore();
const { searchOrtu, searchWali } = toRefs(dialog);

const ortu = reactive(santriState().ortu);
const wali = reactive(santriState().wali);

const loading = ref([]);

onMounted(async () => {});

const check = async (param, id) => {
	if (!id) return;
	loading.value[param] = true;
	const data = await apiGet({ endPoint: `${param}/${id}` });
	// console.log(data);
	if (data) {
		if (param == 'ortu') santriState().setOrtu(data.ortu);
		if (param == 'wali') santriState().setWali(data.wali);
	} else {
		if (param == 'ortu') santriState().setOrtu({ ayah: null, ibu: null });
		if (param == 'wali') santriState().setWali({ nama: null, sex: null });
	}
	loading.value[param] = false;
};

async function pasteOrtu() {
	ortu_id.value = await navigator.clipboard.readText();
}

async function pasteWali() {
	wali_id.value = await navigator.clipboard.readText();
}

watch([ortu_id, wali_id], ([newOrtu, newWali], [oldOrtu, oldWali]) => {
	if (newOrtu != oldOrtu) {
		check('ortu', newOrtu);
	}
	if (newWali != oldWali) {
		check('wali', newWali);
	}
});
</script>
<style scoped>
.slot-after {
	width: 100px;
}
</style>
