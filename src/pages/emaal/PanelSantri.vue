<template>
	<div class="">
		<FilterSantriQuery :active-only="true" bg-color="green-11" @data-filter="(v) => (data = v)" />
		<q-card bordered flat class="q-mt-sm">
			<q-card-section class="q-pa-sm bg-green-7 text-green-11 flex items-center justify-between">
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
					<span v-html="data.display"></span>
				</div>
				<q-btn class="q-px-sm" dense outline glossy icon="add" label="Tambah" no-caps @click="addEmaal" />
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
							:class="(item.aktif ? ' bg-green-12' : '') + ' rounded-borders q-card--bordered'"
						>
							<q-item-section>
								<q-item-label overline>
									{{ item.no_emaal }}
								</q-item-label>
								<q-item-label caption>
									{{ item.keterangan ?? '-' }}
								</q-item-label>
							</q-item-section>
							<q-item-section side>
								<div class="tw:flex tw:items-center tw:gap-4">
									<q-toggle
										v-model="item.aktif"
										color="green-8"
										keep-color
										checked-icon="task_alt"
										unchecked-icon="clear"
										:disable="loading"
										@update:model-value="(val, evt) => updateEmaal(val, evt, item)"
										dense
									/>
									<q-btn
										icon="edit"
										dense
										round
										outline
										glossy
										:color="item.aktif ? 'green-10' : 'gray-9'"
										@click="editEmaal(item)"
									/>
								</div>
							</q-item-section>
						</q-item>
					</q-list>
				</template>
				<div v-else class="text-negative text-overline text-center">Tidak ada data untuk ditampilkan</div>
			</q-card-section>
		</q-card>
	</div>
</template>
<script setup>
import FilterSantriQuery from 'src/components/filters/FilterSantriQuery.vue';
import Emaal from 'src/models/Emaal';
import { onMounted, ref, watchEffect } from 'vue';

const data = ref({});
const emaal = ref([]);
const loading = ref(false);
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

async function addEmaal() {}

async function updateEmaal(val, evt, item) {
	// console.log('v', val);
	// console.log('e', evt);
	// console.log('i', item);
	emaal.value = emaal.value.map((i) => {
		if (val) {
			if (i.id != item.id) i.aktif = false;
		}
		return i;
	});
}
</script>
<style lang=""></style>
