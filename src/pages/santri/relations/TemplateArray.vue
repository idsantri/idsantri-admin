<template>
	<div v-if="spinner">
		<q-spinner-cube color="green-12" size="8em" class="flex q-mx-auto" />
	</div>
	<div v-else>
		<q-list v-if="data.length" separator="">
			<q-item v-for="item in data" :key="item.id" class="q-pa-none">
				<q-item-section side="" class="q-pr-sm">
					<q-btn
						class="q-ma-xs"
						size="sm"
						glossy=""
						icon="edit"
						round=""
						outline
						color="green-8"
						@click="$emit('edit', item)"
					/>
					<q-btn
						v-if="btnPrint"
						class="q-ma-xs text-green-10"
						size="sm"
						glossy=""
						color="green-12"
						icon="print"
						round=""
						@click="$emit('print', item)"
					/>
					<q-btn
						v-if="link"
						class="q-ma-xs"
						size="sm"
						glossy
						icon="info"
						round
						outline
						color="green-8"
						:to="`${link}/${item.id}`"
					/>
				</q-item-section>
				<q-item-section>
					<q-item-label lines="1">
						<div v-for="(val, key) in item" :key="key">
							<div class="row" v-if="key.toLowerCase() != 'id'">
								<div class="col-4 text-caption">
									{{ key }}
								</div>
								<div class="col ellipsis">{{ val }}</div>
							</div>
						</div>
					</q-item-label>
				</q-item-section>
			</q-item>
		</q-list>
		<div v-else style="height: 50px">
			<div class="text-body2 text-center" style="line-height: 50px">
				Tidak ada data untuk ditampilkan!
			</div>
		</div>
		<q-btn
			style="opacity: 0.8"
			icon="add"
			round=""
			dense=""
			color="green-10"
			glossy=""
			class="absolute-bottom-right q-ma-sm text-green-11"
			@click="$emit('add')"
		/>
	</div>
	<!-- <pre>{{ data }}</pre> -->
</template>
<script setup>
// const props = defineProps(['data', 'spinner', 'btnPrint']);
defineProps({
	data: Object,
	spinner: Boolean,
	btnPrint: Boolean,
	link: {
		type: String,
		default: '',
		required: false,
	},
});
</script>
