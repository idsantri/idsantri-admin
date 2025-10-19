<template lang="">
	<q-card class="" flat bordered>
		<q-card-section class="q-pa-sm">
			<q-select
				dense
				:hint="
					$props.activeOnly
						? 'Hanya menampilkan santri aktif'
						: 'Ketikkan ID Santri'
				"
				outlined
				label="ID Santri*"
				v-model="input.santri_id"
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
				:disable="input.santri_id ? true : false"
				behavior="menu"
			>
				<template v-slot:option="scope">
					<q-item v-bind="scope.itemProps">
						<q-item-section>
							<q-item-label
								>{{ scope.opt.id }} &mdash; {{ scope.opt.nama }}
							</q-item-label>
							<q-item-label caption>{{
								scope.opt.data_akhir
							}}</q-item-label>
						</q-item-section>
					</q-item>
				</template>
			</q-select>

			<q-input
				:hint="input.data_akhir"
				class="q-mt-sm"
				dense
				outlined
				label="Nama"
				v-model="input.nama"
				disable=""
				filled=""
			/>
		</q-card-section>
	</q-card>
</template>
<script setup>
import Santri from 'src/models/Santri';
import { onMounted, ref } from 'vue';

const props = defineProps({
	activeOnly: { type: Boolean },
	data: { type: Object },
	// disableSelect: { type: Boolean, default: false },
});
const emit = defineEmits(['emitInput']);

const input = ref({});
const loading = ref(false);
const options = ref([]);

function onInput() {
	input.value.nama = options.value.find(
		(o) => o.id == input.value?.santri_id,
	)?.nama;
	input.value.data_akhir = options.value.find(
		(o) => o.id == input.value?.santri_id,
	)?.data_akhir;

	emit('emitInput', input.value);
}

onMounted(async () => {
	const data = {
		santri_id: props.data?.santri_id,
		nama: props.data?.nama,
		data_akhir: props.data?.data_akhir,
	};
	Object.assign(input.value, data);
});

async function getLists(val) {
	try {
		loading.value = true;
		const response = await Santri.getIds({
			active_only: props.activeOnly ? true : false,
			q: val,
		});
		return response.lists;
	} finally {
		loading.value = false;
	}
}

async function filterFunction(val, update) {
	if (!val) {
		update(() => {
			options.value = [];
		});
		return;
	}
	const listIds = await getLists(val);
	update(
		() => (options.value = listIds),
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
