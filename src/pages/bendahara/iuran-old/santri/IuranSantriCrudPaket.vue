<template>
	<q-card class="full-width" style="max-width: 425px">
		<q-form @submit.prevent="submit">
			<FormHeader :title="props.title" :is-new="true" />
			<q-card-section>
				<div v-if="loadingCrud">
					<q-dialog v-model="loadingCrud" persistent="">
						<q-spinner-cube
							color="green-12"
							size="8em"
							class="flex q-ma-lg q-mx-auto"
						/>
					</q-dialog>
				</div>
				<input-select-santri-id
					:active-only="true"
					@emit-input="(val) => Object.assign(input, val)"
					:data="props.data"
				/>
				<input-select-array
					v-model="input.th_ajaran_h"
					url="tahun-ajaran"
					label="Tahun Ajaran"
					sort="desc"
					class="q-mt-sm"
					:rules="[(val) => !!val || 'Harus diisi!']"
					:selected="input.th_ajaran_h"
					:disable="props.disableThAjaran"
				/>
				<q-select
					label="Pilih paket"
					dense
					outlined
					emit-value
					map-options
					:options="groupPaket()"
					:loading="loadingPaket"
					behavior="menu"
					clearable
					:hint="calculateTotal().toRupiah()"
					v-model="input.paket"
				>
					<template v-slot:after>
						<q-btn
							no-caps
							icon="settings"
							to="/bendahara/iuran-old/atur-paket"
							v-close-popup
							outline=""
							dense
							class="q-pa-sm"
						/>
						<q-btn
							color="green"
							no-caps
							icon="info"
							outline=""
							dense
							class="q-pa-sm"
							@click="expanded = !expanded"
						/>
					</template>
				</q-select>

				<input-select-array
					v-model="input.via"
					url="metode-pembayaran"
					label="Via"
					class="q-mt-sm"
				/>
				<input-select-array
					v-model="input.keterangan"
					url="keterangan-iuran"
					label="Keterangan"
					class="q-mt-sm"
				/>
			</q-card-section>
			<q-slide-transition appear>
				<q-card-section class="q-pt-none" v-show="expanded">
					<q-card
						bordered
						flat
						class="bg-green-1 scroll"
						style="height: 150px"
					>
						<q-card-section class="q-pa-sm q-card--bordered">
							<q-list separator>
								<q-item
									v-for="(item, index) in filterPaket()"
									:key="index"
									dense
								>
									<q-item-section>
										<q-item-label class="flex">
											{{ item.urut ?? '#' }}.
											{{ item.iuran }}
											{{ '(x' + item.qty + ')' }}

											<q-space />

											{{
												(
													Number(item.nominal) *
													Number(item.qty)
												).toRupiah()
											}}
										</q-item-label>
									</q-item-section>
								</q-item>
								<q-item dense>
									<q-item-section>
										<q-item-label
											class="text-right text-bold"
										>
											{{ calculateTotal().toRupiah() }}
										</q-item-label>
									</q-item-section>
								</q-item>
							</q-list>
						</q-card-section>
					</q-card>
				</q-card-section>
			</q-slide-transition>
			<q-card-actions class="flex bg-green-6">
				<q-btn
					v-show="false"
					label="Reset"
					class="bg-red text-red-1"
					no-caps=""
					type="reset"
				/>
				<q-space />
				<q-btn
					label="Tutup"
					v-close-popup
					class="bg-green-11"
					no-caps=""
					id="btn-close"
				/>
				<q-btn
					type="submit"
					label="Simpan"
					class="bg-green-10 text-green-11"
					no-caps=""
				/>
			</q-card-actions>
		</q-form>
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import listsStore from 'src/stores/lists-store';
import apiPost from 'src/api/api-post';
import FormHeader from 'src/components/forms/FormHeader.vue';
import InputSelectSantriId from 'src/components/inputs/InputSelectSantriId.vue';
import InputSelectArray from 'src/components/inputs/InputSelectArray.vue';
import apiGet from 'src/api/api-get';

const props = defineProps({
	data: { type: Object, required: false, default: () => {} },
	title: { type: String, default: () => 'Input' },
});

const emit = defineEmits(['successSubmit', 'successDelete']);

const input = ref({ qty: 1 });
const loadingCrud = ref(false);
const tahunAjaran = ref([]);
const iuran = ref([]);
const loadingPaket = ref(false);
const iuranPaket = ref([]);
const expanded = ref(false);

onMounted(async () => {
	await getData();

	Object.assign(input.value, props.data);
	tahunAjaran.value = listsStore().getByStateName('tahun-ajaran');
	iuran.value = listsStore().getByStateName('iuran-old');
});

async function getData() {
	const data = await apiGet({
		endPoint: 'iuran-paket',
		loading: loadingPaket,
	});
	if (data) {
		iuranPaket.value = data.iuran_paket;
	}
}

function groupPaket() {
	const arrPaket = iuranPaket.value.map((obj) => obj.paket);
	return Array.from(new Set(arrPaket));
}

function filterPaket() {
	return iuranPaket.value.filter((obj) => obj.paket == input.value.paket);
}

function calculateTotal() {
	const calc = filterPaket().reduce(function (acc, obj) {
		return acc + Number(obj.nominal) * Number(obj.qty);
	}, 0);

	return calc;
}

const submit = async () => {
	// document.getElementById('btn-close').click();
	// emit('successSubmit');
	const paket = filterPaket().map((o) => {
		return { iuran: o.iuran, nominal: o.nominal, qty: o.qty };
	});

	const data = {
		santri_id: input.value.santri_id,
		th_ajaran_h: input.value.th_ajaran_h,
		via: input.value.via || '',
		keterangan: input.value.keterangan || '',
		paket: paket,
	};
	// console.log(data);
	// return;

	const response = await apiPost({
		endPoint: 'iuran-old/paket',
		data,
		loading: loadingCrud,
	});
	if (response) {
		document.getElementById('btn-close').click();
		emit('successSubmit', response?.iuran);
	}
};
</script>

<style lang="scss"></style>
