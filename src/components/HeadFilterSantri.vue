<template lang="">
	<q-card>
		<q-card-section class="q-px-sm q-py-sm bg-green-11">
			<q-toolbar class="no-padding" style="min-height: 0">
				<q-toolbar-title class="text-subtitle1">
					<div class="text-subtitle2 text-weight-bold">
						Filter ID Santri
					</div>
				</q-toolbar-title>
				<slot></slot>
			</q-toolbar>
		</q-card-section>
		<q-card-section class="no-padding">
			<div
				class="flex content-start items-center"
				style="max-width: 1000px; width: 100%"
			>
				<q-select
					class="q-pa-sm"
					dense
					outlined
					label="ID Santri"
					v-model="id"
					:options="options"
					emit-value
					map-options
					option-value="id"
					option-label="id"
					error-color="negative"
					:loading="loading"
					use-input
					clearable=""
					@filter="filterFunction"
					@update:model-value="onInput"
					behavior="menu"
				>
					<template v-slot:option="scope">
						<q-item v-bind="scope.itemProps">
							<q-item-section>
								<q-item-label
									>{{ scope.opt.id }} &mdash;
									{{ scope.opt.nama }}
								</q-item-label>
								<q-item-label caption>{{
									scope.opt.data_akhir
								}}</q-item-label>
							</q-item-section>
						</q-item>
					</template>
				</q-select>
				<div v-if="!id" class="q-pa-sm">Ketikkan ID Santri</div>
				<div v-if="notFound" class="q-pa-sm text-negative">
					Data Tidak ditemukan
				</div>
			</div>
		</q-card-section>
	</q-card>
</template>
<script setup>
import apiGet from 'src/api/api-get';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
	startUrl: String,
	activeOnly: { type: Boolean },
});
const emit = defineEmits(['dataFilter']);

const route = useRoute();
const router = useRouter();
const params = {
	id: route.params.id,
};

const id = ref(params.id);
const loading = ref(false);
const options = ref([]);
const notFound = ref(false);

onMounted(async () => {
	emit('dataFilter', {
		display:
			'<div class="text-green-13 text-italic">Tentukan filter!</div>',
	});

	if (id.value) {
		const data = await apiGet({ endPoint: `santri/${id.value}` });
		const dataEmit = {
			display: `
			➡️ ${id.value}
			| <strong>${data.santri.nama}</strong>
			| ${data.santri.data_akhir}
			`,
		};
		emit('dataFilter', dataEmit);
	}
});

function onInput(val) {
	if (val) {
		router.push(`${props.startUrl}/${val}`);
	} else {
		router.push(`${props.startUrl}`);
	}
}
async function filterFunction(val, update) {
	if (!val) {
		update(() => {
			options.value = [];
		});
		return;
	}
	const data = await apiGet({
		endPoint: 'santri/ids',
		loading: loading,
		params: {
			active_only: props.activeOnly ? true : false,
			q: val,
		},
	});
	// console.log(data);
	notFound.value = data.lists.length ? false : true;
	update(
		() => (options.value = data.lists),
		(menuRef) => {
			if (val !== '' && menuRef.options.length) {
				menuRef.setOptionIndex(-1);
				menuRef.moveOptionSelection(1, true);
			}
		},
	);
}
</script>
<style lang=""></style>
