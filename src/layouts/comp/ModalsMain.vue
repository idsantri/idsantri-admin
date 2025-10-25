<template>
	<q-dialog persistent="" v-model="crudSantri">
		<SantriForm />
	</q-dialog>
	<q-dialog v-model="searchSantri" full-width="" style="max-width: 1024px">
		<santri-search />
	</q-dialog>

	<q-dialog persistent="" v-model="crudOrtu">
		<OrtuForm />
	</q-dialog>
	<q-dialog v-model="searchOrtu" full-width="" style="max-width: 1024px">
		<ortu-search />
	</q-dialog>

	<q-dialog persistent="" v-model="crudWali">
		<WaliForm />
	</q-dialog>
	<q-dialog v-model="searchWali" full-width="" style="max-width: 1024px">
		<wali-search />
	</q-dialog>
</template>
<script setup>
import dialogStore from 'src/stores/dialog-store';
import SantriForm from 'src/components/forms/SantriForm.vue';
import SantriSearch from 'src/pages/search/SantriSearch.vue';
import OrtuForm from 'src/components/forms/OrtuForm.vue';
import OrtuSearch from 'src/pages/search/OrtuSearch.vue';
import WaliForm from 'src/components/forms/WaliForm.vue';
import WaliSearch from 'src/pages/search/WaliSearch.vue';

import { toRefs, watchEffect } from 'vue';
const dialog = dialogStore();
const { searchSantri, crudSantri, searchOrtu, crudOrtu, searchWali, crudWali } =
	toRefs(dialog);

watchEffect(() => {
	if (crudSantri.value) searchSantri.value = false;
	if (crudWali.value) searchWali.value = false;
	if (crudOrtu.value) searchOrtu.value = false;
});
</script>
