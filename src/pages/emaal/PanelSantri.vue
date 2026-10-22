<template>
	<div class="">
		<FilterSantriQuery :active-only="true" bg-color="green-11" @data-filter="(v) => (data = v)" />
		<q-card bordered flat class="q-mt-sm">
			<q-card-section class="q-pa-sm bg-green-7 text-green-11 flex items-center justify-between tw:gap-2">
				<div class="flex items-center">
					<q-btn
						icon="sync"
						no-caps
						dense
						flat
						color="white"
						class="q-mr-xs"
						title="Muat ulang"
						:disable="!data?.santri?.id"
						@click="getEmaalBySantri"
					/>
					<span v-html="data.display" class=""></span>
				</div>
				<q-btn
					class="q-px-sm tw:ml-auto"
					dense
					outline
					glossy
					icon="add"
					label="Tambah"
					no-caps
					@click="addEmaal"
				/>
			</q-card-section>
			<q-card-section class="q-pa-sm">
				<q-inner-loading :showing="loading">
					<q-spinner-facebook size="50px" color="green-7" />
				</q-inner-loading>
				<template v-if="emaal?.length">
					<q-list class="tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:md:grid-cols-3 tw:gap-2">
						<q-item
							v-for="item in emaal"
							:key="item.id"
							:class="(item.aktif ? ' bg-green-1' : '') + ' rounded-borders q-card--bordered'"
						>
							<q-item-section>
								<q-item-label :class="(item.aktif ? 'tw:font-semibold' : '') + ' tw:text-lg'">
									<code class="tw:tracking-widest"> {{ item.no_emaal }} </code>
								</q-item-label>
								<q-item-label caption>
									{{ item.keterangan ?? '-' }}
								</q-item-label>
							</q-item-section>
							<q-item-section side>
								<div class="tw:flex tw:items-center tw:gap-4">
									<q-toggle
										:model-value="item.aktif"
										color="green-8"
										keep-color
										checked-icon="task_alt"
										unchecked-icon="clear"
										:disable="loading"
										@update:model-value="(val, evt) => toggleActive(val, evt, item)"
										dense
									/>
									<q-btn
										icon="edit"
										dense
										round
										outline
										glossy
										:color="item.aktif ? 'green-10' : 'gray-9'"
										@click="updateEmaal(item)"
									/>
								</div>
							</q-item-section>
						</q-item>
					</q-list>
				</template>
				<div v-else class="text-negative text-overline text-center">Tidak ada data untuk ditampilkan</div>
			</q-card-section>
		</q-card>
		<q-dialog v-model="formShow">
			<EmaalForm
				:data="formData"
				@success-create="getEmaalBySantri"
				@success-update="getEmaalBySantri"
				@success-delete="handleDelete"
			/>
		</q-dialog>
	</div>
</template>
<script setup>
import FilterSantriQuery from 'src/components/filters/FilterSantriQuery.vue';
import Emaal from 'src/models/Emaal';
import { onMounted, ref, watchEffect } from 'vue';
import EmaalForm from 'src/components/forms/EmaalForm.vue';
import ArrayCrud from 'src/models/ArrayCrud';

const data = ref({});
const emaal = ref([]);
const loading = ref(false);
const formShow = ref(false);
const formData = ref({});

onMounted(() => {
	// console.log('mounted');
});

watchEffect(() => {
	if (data.value?.santri && data.value?.santri?.id) {
		getEmaalBySantri();
		// console.log('watch', data.value.santri);
	} else {
		// console.log('watch empty');
		emaal.value = [];
	}
});

async function getEmaalBySantri() {
	try {
		loading.value = true;
		const response = await Emaal.santri(data.value.santri.id);
		if (response) emaal.value = response.emaal;
	} catch (error) {
		console.error('error get emaal', error);
	} finally {
		loading.value = false;
	}
}

async function addEmaal() {
	// console.log(data.value);
	formData.value = {
		nama: data.value.santri.nama,
		santri_id: data.value.santri.id,
	};
	formShow.value = true;
}
async function updateEmaal(item) {
	formData.value = { nama: data.value.santri.nama, ...item };
	formShow.value = true;
}

async function toggleActive(val, evt, item) {
	const previousAktif = emaal.value.map((i) => ({ id: i.id, aktif: i.aktif }));

	emaal.value = emaal.value.map((i) => {
		return {
			...i,
			aktif: i.id === item.id ? val : val ? false : i.aktif,
		};
	});

	try {
		await Emaal.setAktif(item.id, val);
	} catch (error) {
		emaal.value = emaal.value.map((i) => {
			const previous = previousAktif.find((status) => status.id === i.id);
			return previous ? { ...i, aktif: previous.aktif } : i;
		});
		console.error('error update emaal', error);
	}
}

const handleDelete = (id) => {
	emaal.value = ArrayCrud.remove(emaal.value, id);
};
</script>
<style lang=""></style>
