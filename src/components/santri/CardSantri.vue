<template lang="">
	<q-card>
		<q-card-section class="no-padding">
			<q-toolbar class="bg-green-1">
				<q-toolbar-title class="text-subtitle1">
					Identitas Santri
				</q-toolbar-title>
				<q-btn icon="sync" outline @click="loadData" />
			</q-toolbar>
		</q-card-section>
		<q-card-section class="q-py-sm q-px-none">
			<q-list dense>
				<q-item>
					<q-item-section avatar>
						<q-skeleton v-if="loading || !id" type="QAvatar" />
						<q-avatar v-else class="d-flex">
							<q-img
								:src="santri?.image_url || '/user-default.png'"
								:ratio="1"
								cover
							/>
						</q-avatar>
					</q-item-section>

					<q-item-section>
						<q-item-label overline> Santri </q-item-label>
						<q-item-label>
							<q-skeleton v-if="loading || !id" type="text" />
							<div v-else>
								{{ santri.nama }} ({{ santri.sex }})
							</div>
						</q-item-label>
						<q-item-label caption lines="1">
							<q-skeleton v-if="loading || !id" type="text" />
							<div v-else>
								{{ santri?.alamat_pendek || '-' }}
							</div>
						</q-item-label>
						<q-item-label caption lines="1" class="text-italic">
							<q-skeleton v-if="loading || !id" type="text" />
							<div v-else>
								{{ santri?.data_akhir || '-' }}
							</div>
						</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-skeleton
							v-if="loading || !id"
							type="QBtn"
							class="full-width"
						/>
						<q-btn
							v-else
							outline
							color="green"
							:to="`/santri/${santri?.id}`"
						>
							<small>
								{{ santri?.id }}
							</small>
						</q-btn>
					</q-item-section>
				</q-item>
				<q-separator inset="item" />

				<q-item>
					<q-item-section top avatar>
						<q-avatar> </q-avatar>
					</q-item-section>

					<q-item-section>
						<q-item-label overline> Wali </q-item-label>
						<q-item-label>
							<q-skeleton v-if="loading || !id" type="text" />
							<div v-else>
								{{ wali?.nama }} ({{ wali?.sex }};
								{{ santri?.wali_status }})
							</div>
						</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-skeleton
							v-if="loading || !id"
							type="QBtn"
							class="full-width"
						/>
						<q-btn
							v-else
							outline
							color="green"
							:to="`/wali/${santri?.wali_id}`"
						>
							<small>
								{{ santri?.wali_id }}
							</small>
						</q-btn>
					</q-item-section>
				</q-item>
				<q-separator inset="item" />
				<q-item>
					<q-item-section top avatar>
						<q-avatar> </q-avatar>
					</q-item-section>

					<q-item-section>
						<q-item-label overline> Orang Tua </q-item-label>
						<q-item-label>
							<q-skeleton v-if="loading || !id" type="text" />
							<div v-else>
								{{ ortu?.ayah }} |
								{{ ortu?.ibu }}
							</div>
						</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-skeleton
							v-if="loading || !id"
							type="QBtn"
							class="full-width"
						/>

						<q-btn
							v-else
							outline
							color="green"
							:to="`/ortu/${santri?.ortu_id}`"
						>
							<small>
								{{ santri?.ortu_id }}
							</small>
						</q-btn>
					</q-item-section>
				</q-item>
			</q-list>
		</q-card-section>
	</q-card>
</template>
<script setup>
import { ref, watchEffect } from 'vue';
import apiGet from 'src/api/api-get';
import santriStore from 'src/stores/santri-store';

const emit = defineEmits(['loaded']);
const props = defineProps({
	id: {
		type: [Number, String],
		// required: true,
		validator(value) {
			// Cek jika number langsung
			if (typeof value === 'number') {
				return !isNaN(value);
			}

			// Cek jika string yang bisa dikonversi ke number
			if (typeof value === 'string') {
				const num = Number(value);
				return !isNaN(num);
			}

			return false;
		},
	},
});

const loading = ref(false);
const santri = ref({});
const ortu = ref({});
const wali = ref({});

const loadData = async () => {
	const data = await apiGet({
		endPoint: 'santri/' + props.id,
		loading: loading,
	});
	if (data) {
		santri.value = data.santri;
		wali.value = data.wali;
		ortu.value = data.ortu;

		//store
		santriStore().setSantri(data.santri);
		santriStore().setOrtu(data.ortu);
		santriStore().setWali(data.wali);
	}
};

watchEffect(async () => {
	if (props.id) {
		const santriState = santriStore().getSantri;
		const waliState = santriStore().getWali;
		const ortuState = santriStore().getOrtu;
		if (santriState.id == props.id) {
			santri.value = santriState;
			ortu.value = ortuState;
			wali.value = waliState;
		} else {
			await loadData();
		}
		emit('loaded', santri.value);
	}
});
</script>
<style lang=""></style>
