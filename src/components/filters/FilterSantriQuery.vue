<template>
	<q-card flat bordered>
		<q-card-section class="q-px-sm q-py-sm bg-green-11">
			<q-toolbar class="no-padding" style="min-height: 0">
				<q-toolbar-title class="text-subtitle1">
					<div class="text-subtitle2 text-weight-bold">Filter ID Santri</div>
				</q-toolbar-title>
			</q-toolbar>
		</q-card-section>
		<q-card-section class="q-pa-sm tw:gap-4 tw:grid tw:sm:flex tw:sm:items-center tw:sm:justify-between">
			<q-list class="tw:sm:w-96 q-pa-sm rounded-borders" bordered>
				<q-item class="no-padding">
					<q-item-section avatar>
						<q-skeleton v-if="loading" class="full-width full-height" />
						<q-img v-else :src="santri?.image_url || '/user-default.png'" :ratio="3 / 4" alt="santri" />
					</q-item-section>
					<q-item-section>
						<q-item-label overline>
							<q-skeleton v-if="loading" type="text" />
							<template v-else-if="santri.id">
								{{ santri.nama?.toUpperCase() }} ({{ santri.id }})</template
							>
							<template v-else> ID Santri </template>
						</q-item-label>
						<q-item-label>
							<q-skeleton v-if="loading" type="text" />
							<template v-else-if="santri.data_akhir">{{ santri.data_akhir }}</template>
							<template v-else> Data Akhir </template>
						</q-item-label>
						<q-item-label caption>
							<q-skeleton v-if="loading" type="text" />
							<template v-else-if="santri.alamat_pendek">{{ santri.alamat_pendek }}</template>
							<template v-else> Alamat </template>
						</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-skeleton v-if="loading" type="QBtn" class="full-width" />
						<q-btn
							v-else
							:disable="!santri.id"
							round
							dense
							glossy
							icon="info"
							no-caps
							class="q-px-sm bg-green-8 text-green-11"
							:to="`/santri/${santri.id}`"
						/>
					</q-item-section>
				</q-item>
			</q-list>

			<q-select
				class="tw:w-full tw:sm:max-w-64 bg-white"
				style="grid-row: 1"
				dense
				outlined
				label="ID Santri"
				v-model="santri_id"
				:options="options"
				emit-value
				map-options
				option-value="id"
				option-label="id"
				error-color="negative"
				:error="notFound"
				:loading="loading"
				bottom-slots
				use-input
				clearable=""
				@filter="filterFunction"
				@update:model-value="onInput"
				behavior="menu"
				:hint="activeOnly ? 'Hanya mencari santri aktif' : 'Cari data santri berdasarkan ID'"
			>
				<template v-slot:error> Data tidak ditemukan </template>
				<template v-slot:option="scope">
					<q-item v-bind="scope.itemProps">
						<q-item-section>
							<q-item-label
								>{{ scope.opt.id }} &mdash;
								{{ scope.opt.nama }}
							</q-item-label>
							<q-item-label caption>{{ scope.opt.data_akhir }}</q-item-label>
						</q-item-section>
					</q-item>
				</template>
			</q-select>
		</q-card-section>
	</q-card>
</template>
<script setup>
/**
 * Filter ID Santri
 *
 * use RouteQuery
 */
import { useRouteQuery } from '@vueuse/router';
import Santri from 'src/models/Santri';
import { onMounted, ref } from 'vue';

const santri_id = useRouteQuery('santri_id', '');

const props = defineProps({
	activeOnly: { type: Boolean },
});
const emit = defineEmits(['dataFilter']);
const santri = ref({});
const loading = ref(false);
const options = ref([]);
const notFound = ref(false);
const initData = {
	display: '<span class="text-green-13 text-italic">Tentukan filter!</span>',
	santri: null,
};
const dataFilter = ref(initData);
async function getSantri(id) {
	emit('dataFilter', initData);
	try {
		loading.value = true;
		const res = await Santri.getById({ id });
		if (res) {
			santri.value = res.santri;
			const dataEmit = {
				santri: res.santri,
				display: `
				➡️ ${res.santri.id}
				| <strong>${res.santri.nama}</strong>
				| ${res.santri.data_akhir}
				`,
			};
			emit('dataFilter', dataEmit);
			dataFilter.value = dataEmit;
		}
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	// console.log('🚀 ~ onMounted ~ santri_id.value:', santri_id.value);
	if (santri_id.value) {
		await getSantri(santri_id.value);
	} else {
		emit('dataFilter', initData);
	}
});

function onInput(val) {
	if (val) {
		getSantri(val);
	} else {
		santri.value = {};
		emit('dataFilter', initData);
	}
}

async function filterFunction(val, done) {
	notFound.value = false;
	if (!val || val.length < 3) {
		// done(() => (options.value = [])); // kosongkan options
		done(); // jangan kosongkan options (terakhir)
		return;
	}
	try {
		loading.value = true;
		const data = await Santri.getIds({
			active_only: props.activeOnly ? true : false,
			q: val,
		});
		if (!data.lists?.length) {
			done();
			notFound.value = true;
			return;
		}

		done(
			() => (options.value = data.lists),
			(menuRef) => {
				// highlight first option
				if (val !== '' && menuRef.options.length) {
					menuRef.setOptionIndex(-1);
					menuRef.moveOptionSelection(1, true);
				}
			},
		);
	} catch (error) {
		console.error('🚀 ~ filterFunction ~ error:', error);
		notFound.value = true;
	} finally {
		loading.value = false;
	}
}
</script>
<style></style>
