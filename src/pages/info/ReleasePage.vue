<template>
	<CardPage>
		<CardHeader :show-reload="false" title="Releases" />
		<q-card-section>
			<div class="text-subtitle2 text-weight-bold">ID Santri</div>
			<div class="text-subtitle1">{{ config.INS_SHORT }}</div>
			<div class="text-caption">{{ config.INS_DESC }} {{ config.INS_NAME }}</div>
		</q-card-section>
		<q-card-section class="q-pt-none">
			<div v-for="(item, index) in releases" :key="index" class="q-mb-sm">
				<q-list bordered separator>
					<q-item-label header class="bg-green-1 q-pa-sm text-italic">
						ver. {{ item.ver }}
						<span class="text-caption"> ({{ item.date }}) </span>
					</q-item-label>

					<q-item v-for="(item, index) in item.release" :key="index">
						<q-item-section>
							<q-item-label> {{ index }} </q-item-label>
							<q-item-label caption>
								<ul class="no-margin" style="padding-inline-start: 16px; list-style-type: disc">
									<li v-for="(it, id) in item" :key="id">
										{{ it }}
									</li>
								</ul>
							</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</div>
		</q-card-section>
	</CardPage>
</template>
<script setup>
import config from 'src/config';
import releases from 'src/config/releases';
</script>

<style scoped></style>
