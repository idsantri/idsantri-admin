<template>
	<CardPage>
		<CardHeader title="Pencarian…" :show-reload="false">
			<template #buttons>
				<q-card flat class="bg-green-6">
					<q-tabs
						shrink
						stretch
						class="text-green-7 bg-green-3"
						dense
						no-caps=""
						active-bg-color="green-9"
						active-color="green-11"
					>
						<q-route-tab name="santri" label="Santri" to="santri" exact />
						<q-route-tab name="wali" label="Wali" to="wali" exact />
						<q-route-tab name="ortu" label="Ortu" to="ortu" exact />
					</q-tabs>
				</q-card>
			</template>
			<template #more>
				<q-list>
					<q-item clickable v-close-popup to="/santri/export">
						<q-item-section avatar>
							<q-icon color="green" name="download" />
						</q-item-section>
						<q-item-section> Download Santri </q-item-section>
					</q-item>
				</q-list>
			</template>
		</CardHeader>
		<q-card-section class="q-pa-sm">
			<router-view class="" />
			<!-- <router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" class="q-mt-sm" />
				</transition>
			</router-view> -->
		</q-card-section>
	</CardPage>
</template>

<script setup></script>
