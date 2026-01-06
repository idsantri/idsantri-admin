<template lang="">
	<q-list class="" bordered>
		<CardLoading :showing="loading" />
		<q-item>
			<q-item-section class="">
				<q-item-label caption>Tahun Ajaran</q-item-label>
				<q-item-label overline>{{ budget?.th_ajaran_h }}</q-item-label>
			</q-item-section>
			<q-item-section avatar class="">
				<q-btn icon="sym_o_delete" dense flat no-caps color="negative" @click="$emit('onDelete')" />
			</q-item-section>
		</q-item>
		<q-separator inset />
		<q-item>
			<q-item-section class="">
				<q-item-label caption>Akun</q-item-label>
				<q-item-label overline>
					[{{ budget?.account_id }}] {{ budget?.category }} {{ budget?.group }}:
					<strong>{{ budget?.name }}</strong>
				</q-item-label>
			</q-item-section>
		</q-item>
		<q-separator inset />
		<q-item>
			<q-item-section class="">
				<q-item-label caption>Total Anggaran</q-item-label>
				<q-item-label overline>
					{{ budget?.total_budget?.toRupiah() }}
				</q-item-label>
			</q-item-section>
			<q-item-section class="">
				<q-item-label caption :lines="1">Total Serapan/Alokasi </q-item-label>
				<q-item-label overline>
					{{ budget?.total_absorbed ? budget?.total_absorbed?.toRupiah() : 0 }}
				</q-item-label>
			</q-item-section>
			<q-item-section class="">
				<q-item-label caption>Sisa</q-item-label>
				<q-item-label overline>
					{{ (Number(budget?.total_budget) - Number(budget?.total_absorbed)).toRupiah() }}
				</q-item-label>
			</q-item-section>
		</q-item>
		<q-separator inset />
		<q-item>
			<q-item-section class="">
				<q-item-label caption>Status Anggaran</q-item-label>
				<q-item-label overline class="">
					<q-toggle
						dense
						class="q-pr-lg"
						:model-value="budget?.locked || false"
						disabled
						:label="
							budget?.locked === true ? 'Terkunci' : budget?.locked === false ? 'Terbuka' : 'Tidak diatur'
						"
						color="negative"
						:unchecked-icon="budget?.value === false ? 'lock_open' : 'clear'"
						checked-icon="lock"
					/>
				</q-item-label>
				<q-item-label class="text-italic text-caption" v-if="budget?.locked">
					Anggaran terkunci. Anda tidak dapat melakukan perubahan. Hubungi Admin!
				</q-item-label>
			</q-item-section>
			<q-item-section avatar class="">
				<q-btn
					icon-right="settings"
					dense
					flat
					no-caps
					color="positive"
					:to="`/apb/budgets/configs?th=${budget?.th_ajaran_h}&text=${budget?.group}`"
				/>
			</q-item-section>
		</q-item>
	</q-list>
</template>
<script setup>
defineProps({
	budget: {
		type: Object,
		default: () => ({}),
	},
	loading: {
		type: Boolean,
		default: false,
	},
});
</script>
<style lang=""></style>
