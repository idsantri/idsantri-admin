<template lang="">
	<q-card>
		<q-card-section class="q-pa-sm">
			<q-toolbar class="bg-green-1">
				<q-toolbar-title class="text-subtitle1">
					Identitas Santri
				</q-toolbar-title>
			</q-toolbar>

			<q-list dense>
				<q-item>
					<q-item-section avatar>
						<q-skeleton v-if="loading" type="QAvatar" />
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
							<q-skeleton v-if="loading" type="text" />
							<div v-else>
								{{ santri.nama }} ({{ santri.sex }})
							</div>
						</q-item-label>
						<q-item-label caption lines="1">
							<q-skeleton v-if="loading" type="text" />
							<div v-else>
								{{ santri?.alamat_pendek || '-' }}
							</div>
						</q-item-label>
						<q-item-label caption lines="1" class="text-italic">
							<q-skeleton v-if="loading" type="text" />
							<div v-else>
								{{ santri?.data_akhir || '-' }}
							</div>
						</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-skeleton
							v-if="loading"
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
							<q-skeleton v-if="loading" type="text" />
							<div v-else>
								{{ wali?.nama }} ({{ wali?.sex }};
								{{ santri?.wali_status }})
							</div>
						</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-skeleton
							v-if="loading"
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
							<q-skeleton v-if="loading" type="text" />
							<div v-else>
								{{ ortu?.ayah }} |
								{{ ortu?.ibu }}
							</div>
						</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-skeleton
							v-if="loading"
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
import { onMounted, onUpdated, ref } from 'vue';
import apiGet from 'src/api/api-get';

const props = defineProps({
	id: {
		required: true,
	},
});
const emit = defineEmits(['successGet']);

const loading = ref(false);
const santri = ref({});
const ortu = ref({});
const wali = ref({});
async function fetchData() {
	const data = await apiGet({
		endPoint: `santri/${props.id}`,
		loading,
	});
	if (!data.santri) return;
	santri.value = data.santri;
	wali.value = data.wali;
	ortu.value = data.ortu;
	// console.log(santri.value);
	// const img = await apiGet({
	// 	endPoint: `images/santri/${santri.value.id}`,
	// });
	// santri.value.image = img.image_url;
	emit('successGet', santri.value);
}

onMounted(async () => {
	if (props.id) {
		await fetchData();
	}
});

onUpdated(async () => {
	if (props.id) {
		await fetchData();
	}
});
</script>
<style lang=""></style>
