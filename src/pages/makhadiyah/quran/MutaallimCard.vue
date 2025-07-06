<template lang="">
	<q-card flat bordered class="" style="width: 350px">
		<q-card-section
			class="bg-green-7 text-green-11 q-pa-sm flex items-center justify-between"
		>
			<div>Riwayat Mutaallim</div>
			<q-btn
				icon="add"
				outline
				dense
				class="q-px-sm"
				:disabled="!santri.id"
				@click="handleAdd"
			/>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<CardSantriSimple
				v-if="santri.id"
				:id="santri.id"
				class="q-mb-sm"
			/>

			<q-list bordered separator class="rounded-borders">
				<q-item v-if="loading" class="q-px-sm">
					<q-item-section>
						<q-item-label>
							<q-skeleton type="text" />
						</q-item-label>
						<q-item-label caption>
							<q-skeleton type="text" />
						</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-skeleton type="QRadio" />
					</q-item-section>
				</q-item>
				<q-item v-else-if="!mutaallim?.length" class="q-px-sm">
					<q-item-section>
						<q-item-label> Tidak ada data </q-item-label>
						<q-item-label caption> untuk ditampilkan </q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-btn
							icon="sym_o_exclamation"
							disable
							dense
							outline
							round
							color="green-14"
						/>
					</q-item-section>
				</q-item>

				<q-item
					v-else
					v-for="(item, index) in mutaallim"
					:key="index"
					:active="!!item.aktif"
					active-class="bg-green-1 text-green-10"
					class="q-px-sm"
				>
					<q-item-section>
						<q-item-label>
							{{ item.marhalah }} |
							{{ item.faslah }}
						</q-item-label>
						<q-item-label caption>
							{{ formatDate(item.created_at, 'dd-MM-yyyy') }} |
							{{
								m2hFormat(
									formatDate(item.created_at, 'yyyy-MM-dd'),
								)
							}}
							<span v-if="item.aktif">
								<span>|</span>
								<span class="text-weight-bold text-green-10">
									Aktif
								</span>
							</span>
						</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-btn
							icon="edit"
							dense
							outline
							round
							glossy
							@click="handleEdit(item.id)"
						/>
					</q-item-section>
				</q-item>
			</q-list>
		</q-card-section>
		<q-dialog v-model="crudShow">
			<QuranMutaallimForm
				:data="dataObj"
				@successSubmit="loadMutaallim(dataObj.santri_id)"
				@successDelete="loadMutaallim(dataObj.santri_id)"
			/>
		</q-dialog>
	</q-card>
</template>
<script setup>
import apiGet from 'src/api/api-get';
import QuranMutaallimForm from 'src/components/forms/QuranMutaallimForm.vue';
import CardSantriSimple from 'src/components/santri/CardSantriSimple.vue';
import { getObjectById } from 'src/utils/array-object';
import { formatDate } from 'src/utils/format-date';
import { m2hFormat } from 'src/utils/hijri';
import { onUpdated, ref } from 'vue';

const { santri } = defineProps({ santri: { type: Object } });
const crudShow = ref(false);
const dataObj = ref({});
const mutaallim = ref([]);
const loading = ref(false);

async function loadMutaallim(santriId) {
	const data = await apiGet({
		endPoint: `quran/mutaallim/santri/${santriId}`,
		loading: loading,
	});
	if (data) {
		mutaallim.value = data.mutaallim;
	}
}

onUpdated(async () => {
	// console.log(props);
	if (santri?.id) {
		await loadMutaallim(santri.id);
	} else if (santri?.santri_id) {
		await loadMutaallim(santri.santri_id);
	}
});

const handleAdd = () => {
	dataObj.value = {
		santri_id: santri.id,
		nama: santri.nama,
	};
	crudShow.value = true;
};

const handleEdit = (id) => {
	dataObj.value = getObjectById(mutaallim, id);
	dataObj.value.santri_id = santri.id;
	dataObj.value.nama = santri.nama;

	crudShow.value = true;
};
</script>
<style lang=""></style>
