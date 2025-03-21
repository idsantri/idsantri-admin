<template lang="">
	<q-page class="q-pa-sm">
		<q-card>
			<CardHeader title="Modul Iuran" :show-reload="false">
				<template #left>
					<q-card flat class="q-mr-md bg-green-6">
						<q-tabs
							shrink
							stretch
							dense
							no-caps
							active-bg-color="green-10"
							v-model="tab"
						>
							<q-route-tab
								name="santri"
								label="Santri"
								to="/iuran/santri"
								:class="
									$route.path.startsWith('/iuran/santri')
										? 'bg-green-10'
										: ''
								"
							/>
							<q-route-tab
								name="thAjaran"
								label="Tahun Ajaran"
								to="/iuran/th-ajaran"
								:class="
									$route.path.startsWith('/iuran/th-ajaran')
										? 'bg-green-10'
										: ''
								"
							/>
							<!-- <q-route-tab
								name="tanggal"
								label="Tanggal"
								to="/iuran/tanggal"
								:class="
									$route.path.startsWith('/iuran/tanggal')
										? 'bg-green-10'
										: ''
								"
								disable
							/> -->
						</q-tabs>
					</q-card>
				</template>
				<template #right>
					<q-btn-dropdown
						flat
						round
						dense
						dropdown-icon="more_vert"
						class="q-pa-sm q-ml-sm"
						color="green-11"
					>
						<q-list>
							<!-- input -->
							<q-item clickable v-close-popup to="/iuran/tagihan">
								<q-item-section avatar>
									<q-icon color="green" name="receipt_long" />
								</q-item-section>
								<q-item-section> Buat Tagihan </q-item-section>
							</q-item>
						</q-list>
					</q-btn-dropdown>
				</template>
			</CardHeader>
			<q-card-section class="q-pa-sm">
				<router-view />
			</q-card-section>
		</q-card>
	</q-page>
</template>

<script setup>
import CardHeader from 'src/components/CardHeader.vue';
import { ref } from 'vue';

const tab = ref('santri');
</script>
<style lang="scss"></style>
