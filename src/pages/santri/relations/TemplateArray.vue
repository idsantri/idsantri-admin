<template>
	<div class="relative-position">
		<q-list separator="">
			<template v-if="data.length">
				<q-item v-for="item in data" :key="item.id" class="q-px-none q-py-sm">
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
			</template>
			<template v-if="!data.length">
				<q-item>
					<q-item-section>
						<q-item-label class="text-center text-body2 text-negative text-italic">
							Tidak ada data untuk ditampilkan!
						</q-item-label>
					</q-item-section>
				</q-item>
			</template>
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
		</q-list>
		<CardLoading :showing="spinner" message="" />
	</div>
	<!-- <pre>{{ data }}</pre> -->
</template>
<script setup>
defineProps({
	data: Object,
	spinner: { type: Boolean, default: () => false },
	btnPrint: Boolean,
	link: {
		type: String,
		default: '',
		required: false,
	},
});
</script>
