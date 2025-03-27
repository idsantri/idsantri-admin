<template lang="">
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
		v-model="inputPaket"
		:rules="[(val) => !!val || 'Harus diisi!']"
		:class="[$attrs.class]"
	>
		<template v-slot:after>
			<q-btn
				no-caps
				icon="settings"
				to="/iuran/paket"
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
	<q-slide-transition appear>
		<q-card-section class="no-padding q-my-sm" v-show="expanded">
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
									{{ item.item }}

									<q-space />

									{{ Number(item.nominal).toRupiah() }}
								</q-item-label>
							</q-item-section>
						</q-item>
						<q-item dense>
							<q-item-section>
								<q-item-label class="text-right text-bold">
									{{ calculateTotal().toRupiah() }}
								</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</q-card-section>
			</q-card>
		</q-card-section>
	</q-slide-transition>
</template>
<script setup>
import apiGet from 'src/api/api-get';
import { onMounted, ref, watch } from 'vue';
const loadingPaket = ref(false);
const expanded = ref(false);
const inputPaket = ref('');
const iuranPaket = ref([]);
const emit = defineEmits(['onInput']);

watch(inputPaket, (newVal) => {
	const paket = JSON.parse(JSON.stringify(iuranPaket.value))
		.filter((iuran) => iuran.paket == newVal)
		.map((i) => {
			return { paket: i.paket, item: i.item, nominal: i.nominal };
		});
	emit('onInput', paket || null);
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

onMounted(async () => {
	await getData();
	// console.log(iuranPaket.value);
});

function groupPaket() {
	const arrPaket = iuranPaket.value.map((obj) => obj.paket);
	return Array.from(new Set(arrPaket));
}

function filterPaket() {
	return iuranPaket.value.filter((obj) => obj.paket == inputPaket.value);
}
function calculateTotal() {
	const calc = filterPaket().reduce(function (acc, obj) {
		return acc + Number(obj.nominal);
	}, 0);

	return calc;
}
</script>
<style lang=""></style>
