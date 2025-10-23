<template lang="">
	<q-page class="q-pa-sm">
		<q-card>
			<CardHeader title="Data Aparatur Madrasah" :show-reload="false">
				<template #buttons>
					<q-btn
						dense=""
						class="q-px-sm text-green-10"
						color="green-11"
						label="Data Pesonalia"
						no-caps
						icon="badge"
						to="/personalia"
					/>
				</template>
			</CardHeader>
			<q-card-section class="q-pa-sm">
				<filter-kelas
					:show-ujian-ke="false"
					:show-kelas="false"
					start-url="/madrasah/aparatur"
					@data-filter="(v) => (textFilter = v)"
				/>
			</q-card-section>
			<q-card-section class="q-pa-sm">
				<q-card class="" bordered flat>
					<q-card-section class="bg-green-8 text-green-1 text-subtitle1 q-pa-sm flex flex-center">
						<span v-html="textFilter || ''"></span>
						<q-space />
					</q-card-section>
					<q-card-section class="q-pa-sm">
						<router-view :key="$route.fullPath" />
						<!-- <router-view v-slot="{ Component, route }">
					<transition name="slide-right" mode="out-in">
						<component :is="Component" :key="route.fullPath" />
					</transition>
				</router-view> -->
					</q-card-section>
				</q-card>
			</q-card-section>
		</q-card>
	</q-page>
</template>
<script setup>
import { ref } from 'vue';
import FilterKelas from 'src/components/filters/FilterKelas.vue';

const textFilter = ref('');
</script>
<style lang=""></style>
