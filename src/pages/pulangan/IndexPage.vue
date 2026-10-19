<template lang="">
	<CardPage>
		<CardHeader title="Data Pulangan" @onReload="reload" :show-add="true" @on-add="showForm = true" />
		<q-card-section v-show="!realtime" class="bg-warning q-pa-xs text-black">
			<div class="text-caption text-center">
				Data tidak realtime! Klik tombol muat ulang untuk mendapatkan data terbaru.
			</div>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<q-table flat bordered :rows="pulangan" :columns="columns" :loading="loading" row-key="id">
				<template v-slot:body-cell-id="props">
					<q-td :props="props">
						<q-btn
							dense
							no-caps
							outline
							class="text-green-10 q-px-sm"
							:to="`/pulangan/${props.value}`"
							icon="info"
						>
						</q-btn>
					</q-td>
				</template>
			</q-table>
		</q-card-section>
		<q-dialog v-model="showForm">
			<PulanganForm :data="{}" @success-create="handleCreate" />
		</q-dialog>
	</CardPage>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import PulanganForm from 'src/components/forms/PulanganForm.vue';
import { usePulanganStore } from 'src/stores/pulangan-store';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = usePulanganStore();
const { loading, pulangan } = storeToRefs(store);
const showForm = ref(false);
const router = useRouter();
const realtime = ref(false);

const reload = async () => {
	showForm.value = false;
	await store.loadAll();
	realtime.value = true;
};

onMounted(async () => {
	realtime.value = false;
	if (pulangan.value?.length == 0) {
		await reload();
	}
});

const handleCreate = (data) => {
	showForm.value = false;
	store.create(data);

	router.push(`/pulangan/${data.slug}`);
};

const columns = [
	{
		name: 'id',
		label: 'ID',
		align: 'center',
		field: 'id',
		sortable: true,
	},
	{
		name: 'th_ajaran_h',
		label: 'Tahun Ajaran',
		align: 'left',
		field: 'th_ajaran_h',
		sortable: true,
	},
	{
		name: 'nama',
		label: 'Pulangan',
		align: 'left',
		field: 'nama',
		sortable: true,
	},
];
</script>
<style lang=""></style>
