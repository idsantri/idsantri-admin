<template>
	<q-card-section
		class="bg-green-7 text-green-11 text-subtitle1 q-pa-sm flex flex-center"
	>
		{{ selected?.label || 'List' }}
		<q-space />
		<q-btn
			icon="add"
			label="Baru"
			no-caps
			dense
			class="q-px-md"
			outline
			@click="handleAdd"
		/>
	</q-card-section>
	<q-card-section class="q-pa-sm">
		<ListsSingle
			v-if="selected.style == 'single'"
			:data="listGet"
			:loading="loading"
			@handle-edit="handleEdit"
		/>

		<ListsDouble
			v-if="selected.style == 'double'"
			:data="listGet"
			:loading="loading"
			@handle-edit="handleEdit"
		/>
		<div v-if="selected.style == 'triple'">
			<ListsTriple
				:data="listGet"
				@update-list="handleUpdate"
				@delete-list="handleDelete"
				@add-list="handleAdd"
			/>
		</div>
	</q-card-section>
	<q-dialog v-model="crud">
		<ListsForm
			:data="objList"
			:show-input="showInput"
			@success-delete="fetchData"
			@success-submit="fetchData"
		/>
	</q-dialog>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import listData from './lists-data';

import ListsForm from 'src/components/forms/ListsForm.vue';
import ListsSingle from './ListsStyleSingle.vue';
import ListsDouble from './ListsStyleDouble.vue';
import ListsTriple from './ListsStyleTriple.vue';
import listsStore from 'src/stores/lists-store';
import Lists from 'src/models/Lists';

const crud = ref(false);
const { params } = useRoute();
const loading = ref(false);
const listGet = ref([]);
const objList = ref({});
const showInput = ref({});
const store = listsStore();

onMounted(async () => {
	await fetchData();
});

const selected = listData.find(({ url }) => url == params.listKey);

async function fetchData() {
	try {
		loading.value = true;
		const data = await Lists.getByKey(selected.url);
		listGet.value = data[selected.key];

		const checkState = store.checkState(selected.key);
		if (checkState) {
			store.$patch({ [selected.key]: data[selected.key] });
		}
	} catch (error) {
		console.log('error get list ', error);
	} finally {
		loading.value = false;
	}
}

function setInput() {
	if (selected.column == 1) {
		return {
			val0: true,
			val1: false,
			val2: false,
		};
	}
	if (selected.column == 2) {
		return {
			val0: true,
			val1: true,
			val2: false,
		};
	}
	if (selected.column == 3) {
		return {
			val0: true,
			val1: true,
			val2: true,
		};
	}
}

function handleAdd() {
	showInput.value = setInput();
	objList.value = {};
	objList.value.key = params.listKey;
	crud.value = true;
}

function handleEdit(val) {
	showInput.value = setInput();
	objList.value = JSON.parse(JSON.stringify(val));
	crud.value = true;
}
</script>
