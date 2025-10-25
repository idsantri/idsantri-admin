<template lang="">
	<CardPage>
		<CardHeader title="Pengaturan Profil Lembaga" @onReload="loadData" />

		<q-card-section class="q-pa-sm">
			<q-form @submit.prevent="onSubmit">
				<q-card style="max-width: 600px" flat bordered>
					<q-card-section class="q-pa-sm">
						<q-card>
							<q-card-section class="q-pa-sm bg-green-1 text-weight-medium"> Pesantren </q-card-section>
							<q-card-section class="q-pa-sm">
								<q-input
									dense
									class=""
									outlined
									label="Lembaga"
									v-model="profile.pesantren[0]"
									:loading="loading"
								/>
								<q-input
									dense
									class="q-mt-sm"
									outlined
									label="Nama"
									v-model="profile.pesantren[1]"
									:loading="loading"
								/>
								<q-input
									dense
									class="q-mt-sm"
									outlined
									label="Akronim/Singkatan"
									v-model="profile.pesantren[2]"
									:loading="loading"
								/>
							</q-card-section>
						</q-card>
						<q-card class="q-mt-sm">
							<q-card-section class="q-pa-sm bg-green-1"> Madrasah </q-card-section>
							<q-card-section class="q-pa-sm">
								<q-input
									dense
									class=""
									outlined
									label="Lembaga"
									v-model="profile.madrasah[0]"
									:loading="loading"
								/>
								<q-input
									dense
									class="q-mt-sm"
									outlined
									label="Nama"
									v-model="profile.madrasah[1]"
									:loading="loading"
								/>
								<q-input
									dense
									class="q-mt-sm"
									outlined
									label="Akronim/Singkatan"
									v-model="profile.madrasah[2]"
									:loading="loading"
								/>
							</q-card-section>
						</q-card>
						<q-card class="q-mt-sm">
							<q-card-section class="q-pa-sm bg-green-1"> Alamat </q-card-section>
							<q-card-section class="q-pa-sm">
								<q-input
									dense
									class=""
									outlined
									label="Alamat (baris-1)"
									v-model="profile.alamat[0]"
									:loading="loading"
								/>
								<q-input
									dense
									class="q-mt-sm"
									outlined
									label="Alamat (baris-2)"
									v-model="profile.alamat[1]"
									:loading="loading"
								/>
								<q-input
									dense
									class="q-mt-sm"
									outlined
									label="Kota (Surat)"
									v-model="profile.alamat[2]"
									:loading="loading"
								/>
							</q-card-section>
						</q-card>
						<q-card class="q-mt-sm">
							<q-card-section class="q-pa-sm bg-green-1 flex">
								Personalia
								<q-space />
								<q-btn-dropdown label="Upload" outline no-caps icon="upload">
									<q-list>
										<q-item
											v-for="(item, index) in uploadRoutes"
											:key="index"
											clickable
											v-close-popup
											:to="item.to"
										>
											<q-item-section avatar>
												<q-icon :name="item.icon" />
											</q-item-section>
											<q-item-section>
												<q-item-label>
													{{ item.label }}
												</q-item-label>
											</q-item-section>
										</q-item>
									</q-list>
								</q-btn-dropdown>
							</q-card-section>
							<q-card-section class="q-pa-sm">
								<q-input
									dense
									class=""
									outlined
									label="Pengasuh"
									v-model="profile.personalia.pengasuh"
									:loading="loading"
								/>
								<q-input
									dense
									class="q-mt-sm"
									outlined
									label="Ketua"
									v-model="profile.personalia.ketua"
									:loading="loading"
								/>
								<q-input
									dense
									class="q-mt-sm"
									outlined
									label="Sekretaris"
									v-model="profile.personalia.sekretaris"
									:loading="loading"
								/>
							</q-card-section>
						</q-card>
					</q-card-section>
					<q-card-actions align="right" class="bg-green-7">
						<q-btn label="Simpan" type="submit" no-caps icon="save" class="bg-green-11" />
					</q-card-actions>
				</q-card>
			</q-form>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import apiGet from 'src/api/api-get';
import apiPost from 'src/api/api-post';

const loading = ref(false);
// init data
const profile = ref({
	pesantren: [],
	madrasah: [],
	alamat: [],
	personalia: {},
});

async function loadData() {
	const data = await apiGet({
		endPoint: 'config/profiles',
		loading: loading,
	});
	Object.assign(profile.value, data.profiles);
	// console.log(profile.value);
}

onMounted(async () => {
	await loadData();
});
async function onSubmit() {
	const data = JSON.parse(JSON.stringify(profile.value));
	// console.log(data);
	const res = await apiPost({
		endPoint: 'config/profiles',
		data,
		loading,
	});
	if (!res) {
		await loadData();
	}
}

const uploadRoutes = [
	{
		to: '/settings/profile/upload/stempel',
		icon: 'approval',
		label: 'Stempel',
	},
	{
		to: '/settings/profile/upload/tt-pengasuh',
		icon: 'draw',
		label: 'Tanda Tangan Pengasuh',
	},
	{
		to: '/settings/profile/upload/tt-ketua',
		icon: 'draw',
		label: 'Tanda Tangan Ketua',
	},
	{
		to: '/settings/profile/upload/tt-sekretaris',
		icon: 'draw',
		label: 'Tanda Tangan Sekretaris',
	},
];
</script>
<style lang=""></style>
