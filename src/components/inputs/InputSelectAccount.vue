<template lang="">
	<q-select
		label="Pilih paket"
		dense
		outlined
		emit-value
		map-options
		:options="optionsSelect"
		:loading="loading"
		behavior="menu"
		option-value="id"
		option-label="group_nama"
		clearable
		v-model="input"
		:rules="[(val) => !!val || 'Harus diisi!']"
		:class="[$attrs.class]"
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
						@click="store.loadAccounts(false)"
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
</template>
<script setup>
import { storeToRefs } from 'pinia';
import accountsStore from 'src/stores/apb-accounts-store';
import { computed, onMounted, ref } from 'vue';

const expanded = ref(false);
const inputPaket = ref('');
const emit = defineEmits(['onInput']);
const input = defineModel();

const store = accountsStore();
const { loading, accounts, optionsSelect } = storeToRefs(store);

const hintSelect = computed(() => {
	if (input.value) {
		const account = accounts.value?.find((acc) => acc?.id === input.value);
		return account?.kategori + ' [' + account?.id + '] ' + account?.group + ': ' + account?.nama || '';
	} else {
		return 'Pilih akun';
	}
});

onMounted(async () => {
	if (!accounts.value?.length) {
		await store.loadAccounts(false);
	}
});
</script>
<style lang=""></style>
