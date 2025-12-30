<template lang="">
	<div :class="[$attrs.class]">
		<div class="tw:flex tw:gap-2 tw:items-center tw:justify-between tw:gap-x-4 q-mb-sm">
			<div class="text-italic text-caption">Filter Akun</div>
			<div class="tw:flex tw:gap-2 tw:items-center tw:justify-between tw:flex-grow">
				<q-radio
					v-model="category"
					checked-icon="task_alt"
					unchecked-icon="panorama_fish_eye"
					val="Aktiva"
					label="Aktiva"
					dense
				/>
				<q-radio
					v-model="category"
					checked-icon="task_alt"
					unchecked-icon="panorama_fish_eye"
					val="Pendapatan"
					label="Pendapatan"
					dense
				/>
				<q-radio
					v-model="category"
					checked-icon="task_alt"
					unchecked-icon="panorama_fish_eye"
					val="Biaya"
					label="Biaya"
					dense
				/>
			</div>
		</div>
		<q-select
			label="Pilih Akun"
			dense
			outlined
			emit-value
			map-options
			:options="options"
			:loading="loading"
			behavior="menu"
			option-value="id"
			option-label="group_name"
			clearable
			v-model="input"
			:rules="[(val) => !!val || 'Harus diisi!']"
			:hint="hintSelect"
		>
			<template v-slot:after>
				<q-card flat bordered>
					<q-btn-dropdown flat dropdown-icon="more_vert" class="q-px-sm" color="">
						<q-btn
							class="block full-width"
							v-close-popup
							no-caps
							label="Muat ulang"
							icon="sync"
							flat
							@click="reload"
						/>
						<q-separator />
						<q-btn
							class="block full-width"
							v-close-popup
							no-caps
							label="Daftar akun"
							icon="info"
							flat
							to="/apb/accounts"
						/>
					</q-btn-dropdown>
				</q-card>
			</template>
		</q-select>
	</div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import accountsStore from 'src/stores/apb-accounts-store';
import { computed, onMounted, ref } from 'vue';

const input = defineModel();
const category = ref('');
const store = accountsStore();
const { loading, accounts, optionsSelect } = storeToRefs(store);

const hintSelect = computed(() => {
	if (input.value) {
		const account = accounts.value?.find((acc) => acc?.id === input.value);
		return account?.category + ' [' + account?.id + '] ' + account?.group + ': ' + account?.name || '';
	} else {
		return 'Pilih akun';
	}
});

const options = computed(() =>
	category.value
		? optionsSelect.value.filter((acc) => acc.category.toLowerCase() === category.value.toLowerCase())
		: optionsSelect.value,
);

const reload = () => store.loadAll(false);

onMounted(async () => {
	if (!accounts.value?.length) {
		await reload();
	}
});
</script>
<style lang=""></style>
