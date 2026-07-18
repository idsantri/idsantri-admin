<template>
	<div>
		<q-card-section class="bg-green-7 text-green-11 text-subtitle1 q-pa-sm flex flex-center">
			{{ selected?.label || 'List' }}
			<q-space />
			<q-btn icon="add" label="Baru" no-caps dense class="q-px-md" outline @click="handleAdd" />
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<ListsTable :data="listGet" :loading="loading" @handle-edit="handleEdit" :selected="selected" />
		</q-card-section>
		<q-dialog v-model="crud">
			<ListsForm :data="objList" :selected="selected" @success-delete="reload" @success-submit="reload" />
		</q-dialog>
	</div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import ListsForm from 'src/components/forms/ListsForm.vue';
import { useListsStore, listData } from 'src/stores/lists-store';
import { storeToRefs } from 'pinia';
import ListsTable from './ListsTable.vue';

const crud = ref(false);
const { params } = useRoute();
const listGet = ref([]);
const objList = ref({});
const store = useListsStore();
const storeRef = storeToRefs(store);
const { loading } = storeRef;

const selected = listData.find(({ url }) => url == params.listKey);

async function reload() {
	await store.fetchList(selected.url);
	listGet.value = store.getStateByKey(selected.key);
}

onMounted(async () => {
	await reload();
});

function handleAdd() {
	objList.value = {};
	objList.value.key = params.listKey;
	crud.value = true;
}

function handleEdit(val) {
	objList.value = JSON.parse(JSON.stringify(val));
	crud.value = true;
}
</script>
