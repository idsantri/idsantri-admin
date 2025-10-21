<template>
	<q-page class="q-pa-sm">
		<q-card style="max-width: 600px">
			<CardHeader title="Input Auto Complete" :show-reload="false" />
			<q-card-section class="q-pa-sm">
				<q-select
					dense
					outlined
					label="Pilih List"
					v-model="listModel"
					:options="options"
					emit-value
					map-options
					@update:model-value="(v) => routerPush(v)"
					behavior="menu"
				/>
			</q-card-section>
			<q-card-section class="q-pa-sm">
				<q-card v-if="listModel" class="" bordered flat>
					<router-view :key="$route.fullPath" />
				</q-card>
				<q-card v-else class="" bordered flat>
					<q-card-section class="bg-green-1 text-center text-italic text-subtitle1 q-pa-lg">
						Silakan pilih lists yang tersedia!
					</q-card-section>
				</q-card>
			</q-card-section>
		</q-card>
	</q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import listsStore from 'src/stores/lists-store';

const router = useRouter();
const { params } = useRoute();
const listKey = params.listKey;

const { listData } = listsStore();
const listModel = ref(listData.find(({ url }) => url == listKey));
const options = ref([]);

/**
 * JANGAN tampilkan tingkat pendidikan
 * filter lists
 **/
onMounted(() => {
	options.value = listData.filter((item) => item.protected == false);
});

function routerPush(list) {
	router.push(`/settings/lists/${list.url}`);
}
</script>
