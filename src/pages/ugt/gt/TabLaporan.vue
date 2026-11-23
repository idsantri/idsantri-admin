<template>
	<q-list bordered separator>
		<template v-if="loading">
			<q-item>
				<q-item-section> <q-skeleton height="4rem" /> </q-item-section>
			</q-item>
		</template>
		<template v-else>
			<template v-if="!laporan?.length">
				<q-item>
					<q-item-section>
						<q-item-label class="text-center text-negative text-italic">
							Laporan belum diatur untuk tahun ajaran ini
						</q-item-label>
						<q-item-label class="text-center text-italic">
							<router-link class="tw:underline" to="/ugt/laporan"> Atur Laporan! </router-link>
						</q-item-label>
					</q-item-section>
				</q-item>
			</template>
			<template v-else>
				<q-item v-for="lapor in laporan" :key="lapor.config_id">
					<q-item-section avatar class="">
						<q-icon
							:color="lapor.locked ? 'negative' : 'positive'"
							:name="lapor.locked ? 'lock' : 'lock_open'"
						/>
					</q-item-section>
					<q-item-section>
						<q-item-label overline>{{ lapor.config_id }} </q-item-label>
						<q-item-label>Laporan ke-{{ lapor.laporan_ke }} ({{ lapor.bulan_hijri }})</q-item-label>
						<q-item-label caption>{{
							lapor.tgl_lapor
								? formatDate(lapor.tgl_lapor, 'dd-MM-yyyy') +
									' | ' +
									masehiToHijriFormat(lapor.tgl_lapor)
								: '-'
						}}</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-btn
							icon="info"
							round
							outline
							:glossy="!!lapor.id"
							:disable="!lapor.id"
							:to="`/ugt/laporan/gt/${lapor.id}`"
						/>
					</q-item-section>
				</q-item>
			</template>
		</template>
	</q-list>
	<!-- <pre>{{ laporan[0] }}</pre> -->
</template>
<script setup>
import UgtLaporanGt from 'src/models/UgtLaporanGt';
import { formatDate } from 'src/utils/format-date';
import { masehiToHijriFormat } from 'src/utils/hijri';
import { onMounted, ref } from 'vue';

const props = defineProps({
	gtId: {
		type: [Number, String],
		required: true,
	},
});
const laporan = ref([]);
const loading = ref(false);
async function getLaporan() {
	if (!props.gtId) return;
	try {
		loading.value = true;
		const resData = await UgtLaporanGt.getAllByGt(props.gtId);
		if (resData) {
			laporan.value = resData.laporan;
		}
	} finally {
		loading.value = false;
	}
}
onMounted(async () => {
	await getLaporan();
});
</script>
<style lang=""></style>
