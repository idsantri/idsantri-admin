<template>
	<div class="q-ma-sm">
		<q-card>
			<q-card-section class="bg-green-8 text-green-11 q-px-sm q-py-none">
				<q-toolbar class="no-padding no-margin">
					<q-toolbar-title class="text-subtitle1"> Penomoran: {{ $route.name }} </q-toolbar-title>

					<q-btn
						v-if="showButton(`madrasah/tingkat/id-murid`)"
						dense
						class="q-px-md q-mr-sm text-green-10"
						label="ID Murid"
						no-caps=""
						@click="$router.push(`/madrasah/tingkat/id-murid`)"
						color="green-2"
					/>
				</q-toolbar>
			</q-card-section>

			<q-card-section class="q-pa-sm">
				<router-view :key="$route.fullPath" />
				<!-- <router-view v-slot="{ Component }">
					<transition name="fade" mode="out-in">
						<component :is="Component" :key="$route.fullPath" />
					</transition>
				</router-view> -->
			</q-card-section>
		</q-card>
	</div>
</template>
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

function showButton(param) {
	return route.fullPath.search(param) > 0 ? false : true;
}
</script>

<style lang="scss" scoped></style>
