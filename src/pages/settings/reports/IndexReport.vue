<template lang="">
	<CardPage>
		<CardHeader title="Pengaturan Report (Print Out)" @onReload="loadData" />
		<q-card-section class="q-pa-sm">
			<q-card style="max-width: 600px" flat bordered>
				<q-card-section class="q-pa-sm bg-green-7 text-green-1"> Input Footnote Report</q-card-section>

				<q-form @submit.prevent="onSubmit">
					<q-card-section class="q-pa-sm">
						<q-select
							v-model="selected"
							dense
							class=""
							outlined
							label="Report"
							emit-value
							map-options
							:options="lists"
							:loading="loading"
							use-input=""
							clearable
							behavior="menu"
							@update:model-value="onUpdate"
						/>
						<div class="text-caption q-mt-md">Catatan Kaki</div>
						<q-editor
							v-model="selectedFootnote"
							min-height="5rem"
							class="q-mt-sm"
							paragraph-tag="p"
							:toolbar="[
								['left', 'center', 'right', 'justify'],
								['bold', 'italic', 'underline'],
								['hr'],
								['unordered', 'ordered', 'outdent', 'indent'],
								['undo', 'redo'],
							]"
						/>
					</q-card-section>
					<q-card-actions align="right" class="bg-green-7">
						<q-btn label="Simpan" type="submit" no-caps icon="save" class="bg-green-11" />
					</q-card-actions>
					<CardLoading :showing="loading" />
				</q-form>
			</q-card>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import apiGet from 'src/api/api-get';
import apiPost from 'src/api/api-post';
import { snakeToTitleCase, snakeToKebabCase } from 'src/utils/format-text';

const reports = ref({});
const loading = ref(false);
const lists = ref([]);
const selected = ref('');
const selectedFootnote = ref('');

function onUpdate(v) {
	selectedFootnote.value = v ? reports.value[v]?.footnote : '';
}

async function onSubmit() {
	const data = { footnote: selectedFootnote.value };
	// console.log(data);
	const res = await apiPost({
		endPoint: `config/reports/${snakeToKebabCase(selected.value)}`,
		data,
		loading,
	});
	if (res) {
		await loadData();
	}
}
async function loadData() {
	const data = await apiGet({
		endPoint: 'config/reports',
		loading: loading,
	});
	Object.assign(reports.value, data.reports);
	// console.log(profile.value);
	const keys = Object.keys(data.reports);

	const arrayObject = keys.map((item) => {
		return {
			label: snakeToTitleCase(item),
			value: item,
		};
	});
	lists.value = arrayObject;
}

onMounted(async () => {
	loadData();
});
</script>
<style lang=""></style>
