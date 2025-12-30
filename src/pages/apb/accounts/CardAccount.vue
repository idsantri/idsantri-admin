<template lang="">
	<q-card flat bordered>
		<q-card-section class="q-pa-sm">
			<div class="tw:flex tw:items-center tw:flex-wrap tw:justify-between tw:gap-x-4 tw:gap-y-2">
				<div class="">
					<div class="text-caption text-italic">Akun</div>
					<div class="text-body2">{{ account?.id }}</div>
				</div>
				<div class="">
					<div class="text-caption text-italic">Kategori</div>
					<div class="text-body2">{{ account?.category }}</div>
				</div>
				<div class="">
					<div class="text-caption text-italic">Group</div>
					<div class="text-body2">{{ account?.group }}</div>
				</div>
				<div class="">
					<div class="text-caption text-italic">Nama</div>
					<div class="text-body2">{{ account?.name }}</div>
				</div>
				<div class="">
					<div class="text-caption text-italic">Saldo Normal</div>
					<div class="text-body2">{{ account?.normal_balance == 'D' ? 'Debit' : 'Kredit' }}</div>
				</div>
				<div class="">
					<!-- <div class="text-caption text-italic">Sembunyikan</div> -->
					<div class="">
						<q-toggle
							:model-value="account?.hidden"
							:true-value="true"
							:false-value="false"
							checked-icon="check"
							unchecked-icon="clear"
							color="negative"
							left-label
							@update:model-value="(value, event) => $emit('update', { ...account, hidden: value })"
						>
							<span class="text-caption text-italic">Sembunyikan</span>
						</q-toggle>
					</div>
				</div>
			</div>
		</q-card-section>
	</q-card>
</template>
<script setup>
defineProps({
	account: { type: Object, required: true },
});
</script>
<style lang=""></style>
