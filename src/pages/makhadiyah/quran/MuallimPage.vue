<template lang="">
	<q-card flat class="flex items-start">
		<q-card-section class="q-pa-sm col-grow">
			<q-card flat bordered>
				<TableHeader
					title="Data Muallim AKTIF"
					v-model="filter"
					@on-reload="null"
					@on-filter="showFilter = !showFilter"
					:show-filter="showFilter"
				/>
				<!-- <transition name="fade">
					<q-card-section class="q-pa-sm" v-if="showFilter">
						<FilterDomisili
							v-if="showDomisili"
							v-model="modelDomisili"
							:options="optionsDomisili"
							@on-toggle="showDomisili = !showDomisili"
						/>
						<FilterKelas
							v-else
							v-model:modelTingkat="modelTingkat"
							v-model:modelKelas="modelKelas"
							:optionsTingkat="optionsTingkat"
							:optionsKelas="optionsKelas"
							@on-toggle="showDomisili = !showDomisili"
						/>
					</q-card-section>
				</transition> -->
				<!-- <q-table
					:rows="filteredSantri"
					:filter="filter"
					:loading="loading"
					:rows-per-page-options="[10, 25, 50, 100, 0]"
					flat
					@row-click="(evt, row, index) => (selected = row)"
					:columns="columnSantri"
					table-header-class="bg-green-1 text-green-10 text-subtitle1"
				/> -->
			</q-card>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<q-card flat bordered class="" style="width: 350px">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
				nihil praesentium molestias a adipisci, dolore vitae odit,
				quidem consequatur optio voluptates asperiores pariatur eos
				numquam rerum delectus commodi perferendis voluptate?
			</q-card>

			<!-- <MutaallimCard :santri="selected" /> -->
		</q-card-section>
	</q-card>
</template>
<script setup>
import { ref } from 'vue';
import TableHeader from './TableHeader.vue';
const filter = ref('');
const showFilter = ref(false);
</script>
<style lang=""></style>
