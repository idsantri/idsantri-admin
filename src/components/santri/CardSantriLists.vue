<template>
	<q-card bordered flat>
		<q-card-section class="bg-green-7 text-green-11 q-pa-sm">
			<div class="flex items-center">
				<div class="text-subtitle2">{{ title }}</div>
				<q-space />
				<slot name="button" />
			</div>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<q-list bordered separator>
				<template v-if="data?.length">
					<q-item v-for="item in data" :key="item.id" class="" clickable v-ripple :to="'/santri/' + item.id">
						<q-item-section avatar>
							<q-avatar square="">
								<q-img :src="item?.image || '/user-default.png'" alt="santri" fit="cover" />
							</q-avatar>
						</q-item-section>

						<q-item-section>
							<q-item-label lines="1" class="text-bold"> {{ item.nama }} ({{ item.sex }}) </q-item-label>
							<q-item-label overline="" lines="1">
								{{ item.id }} |
								{{ item.data_akhir }}
							</q-item-label>

							<q-item-label lines="1">
								<div class="row">
									<div class="col-2 text-caption">Wali:</div>
									<div class="col">{{ item.wali_nama }} ({{ item.wali_status }})</div>
								</div>
								<div class="row">
									<div class="col-2 text-caption">Ortu:</div>
									<div class="col">
										{{ item.ayah }} |
										{{ item.ibu }}
									</div>
								</div>
							</q-item-label>
						</q-item-section>
					</q-item>
				</template>
				<template v-else>
					<q-item>
						<q-item-section>
							<q-item-label class="text-center text-body2 text-negative text-italic">
								Tidak ada data untuk ditampilkan!
							</q-item-label>
						</q-item-section>
					</q-item>
				</template>
			</q-list>
			<CardLoading :showing="loading" message="" />
		</q-card-section>
	</q-card>
</template>

<script setup>
defineProps({
	title: String,
	data: Array,
	loading: Boolean,
});
</script>
