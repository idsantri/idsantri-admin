<template lang="">
	<CardPage>
		<CardHeader title="Data Alumni" @onReload="loadData"> </CardHeader>
		<q-card-section class="bg-green-12 q-pa-xs text-caption">
			Menampilkan data santri berhenti/diberhentikan
		</q-card-section>
		<q-card-section class="q-pa-sm tw:grid tw:grid-cols-1 tw:sm:flex tw:sm:justify-between tw:gap-2 bg-green-11">
			<q-card flat bordered style="min-width: 300px">
				<q-toggle
					v-model="toggleSend"
					label="Terkirim"
					color="green-7"
					checked-icon="check"
					unchecked-icon="clear"
				/>
			</q-card>
			<q-card flat bordered style="min-width: 300px">
				<InputSearch v-model="filter" />
			</q-card>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<CardLoading :showing="cardLoading" />
			<q-table
				:rows="filteredAlumni"
				:loading="loading"
				:filter="filter"
				:rows-per-page-options="[10, 25, 50, 75, 100, 0]"
				flat
				bordered
				row-key="id"
				:columns="columns"
			>
				<template v-slot:header="props">
					<q-tr :props="props">
						<q-th v-for="col in props.cols" :key="col.name" :props="props">
							{{ col.label }}
						</q-th>
						<q-th class="text-center">Kirim</q-th>
						<q-th class="text-center">Selesai</q-th>
					</q-tr>
				</template>
				<template v-slot:body="props">
					<q-tr :props="props">
						<q-td v-for="col in props.cols" :key="col.name" :props="props">
							<span v-if="col.name == 'santri_id'">
								<q-btn
									:label="col.value"
									no-caps
									size="sm"
									outline
									class="text-green-10"
									:to="`/santri/${col.value}`"
								></q-btn>
							</span>
							<span v-else>
								{{ col.value }}
							</span>
						</q-td>
						<q-td class="text-center">
							<q-btn
								:disable="props.row.sent_to_alumni_at ? true : false"
								class="q-px-sm"
								dense
								icon="sym_o_forward"
								:outline="props.row.sent_to_alumni_at ? true : false"
								color="green"
								@click="handleSend(props.row)"
								label="Kirim"
								no-caps
							/>
						</q-td>
						<q-td class="text-center">
							<q-toggle
								:model-value="!!props.row.sent_to_alumni_at"
								@click="handleSign(props.row)"
								checked-icon="check"
								unchecked-icon="clear"
								color="green-7"
							/>
							<q-tooltip>
								{{
									props.row.sent_to_alumni_at
										? 'Data sudah terkirim ✅ — Klik untuk mengubah status!'
										: 'Data belum terkirim ❌ — Klik untuk mengubah status!'
								}}
							</q-tooltip>
						</q-td>
					</q-tr>
				</template>
			</q-table>
		</q-card-section>
		<!-- <pre>{{ alumni[0] }}</pre> -->
	</CardPage>
</template>
<script setup>
import InputSearch from 'src/components/inputs/InputSearch.vue';
import Alumni from 'src/models/Alumni';
import ArrayCrud from 'src/models/ArrayCrud';
import { formatDate } from 'src/utils/format-date';
import { notifyConfirm } from 'src/utils/notify';
import { computed, onMounted, ref } from 'vue';
const alumni = ref([]);
const loading = ref(false);
const toggleSend = ref(false);
const filter = ref('');
const cardLoading = ref(false);

async function loadData() {
	try {
		loading.value = true;
		const data = await Alumni.getAll();
		alumni.value = data.alumni;
	} catch (error) {
		console.log('🚀 ~ loadData ~ error:', error);
	} finally {
		loading.value = false;
	}
}

async function handleSign(row) {
	const activated = !!row.sent_to_alumni_at;
	try {
		cardLoading.value = true;
		const msgTitle = ['belum terkirim', 'sudah terkirim'];
		const msgWarn = [
			'Data yang sudah terkirim tidak bisa ditarik lagi!',
			'Jika data belum terkirim, Anda perlu klik tombol kirim setelah ini!',
		];
		let message = `Tandai ${activated ? msgTitle[0] : msgTitle[1]}?`;
		message += '<br/><br/><hr/>';
		message += '<small>';
		message += '<em>Aksi ini hanya mengubah status!</em><br/>';
		message += `<em>${activated ? msgWarn[0] : msgWarn[1]}</em><br/>`;
		message += `</small>`;
		message += `<hr/>`;

		const confirm = await notifyConfirm(message);
		if (!confirm) return;

		await Alumni.update({ id: row.id, data: { activated: !activated } });

		const newData = { ...row, sent_to_alumni_at: row.sent_to_alumni_at ? null : new Date().toISOString() };
		alumni.value = ArrayCrud.update(alumni.value, row.id, newData);
	} catch (error) {
		console.log('Error updating sent status:', error);
	} finally {
		cardLoading.value = false;
	}
}

async function handleSend(row) {
	const confirm = await notifyConfirm('Kirim data ke aplikasi alumni?');
	if (!confirm) return;
	// console.log(row);
	try {
		cardLoading.value = true;
		await Alumni.create({ data: { id: row.id } });
		const newData = { ...row, sent_to_alumni_at: new Date().toISOString() };
		alumni.value = ArrayCrud.update(alumni.value, row.id, newData);
	} catch (error) {
		console.log('Error updating sent status:', error);
	} finally {
		cardLoading.value = false;
	}
}
const filteredAlumni = computed(() => {
	return toggleSend.value
		? alumni.value.filter((item) => item.sent_to_alumni_at)
		: alumni.value.filter((item) => !item.sent_to_alumni_at);
});

onMounted(async () => {
	await loadData();
});

const columns = [
	{
		name: 'santri_id',
		label: 'Santri ID',
		align: 'center',
		field: 'santri_id',
		sortable: true,
	},
	{
		name: 'nama',
		label: 'Name',
		align: 'left',
		field: 'nama',
		sortable: true,
	},
	{
		name: 'created_at',
		label: 'Tanggal',
		field: 'created_at',
		format: (val) => formatDate(val, 'dd-MM-yyyy'),
		sortable: true,
	},
	{
		name: 'alamat',
		label: 'Alamat',
		align: 'left',
		field: (row) => row.desa + ' ' + row.kecamatan + ' ' + row.kabupaten,
	},
];
</script>
<style lang=""></style>
