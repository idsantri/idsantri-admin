<template lang="">
	<q-select
		label="Grup Akun"
		dense
		outlined
		emit-value
		map-options
		:options="options"
		:loading="loading"
		behavior="menu"
		option-value="name"
		option-label="category_name"
		clearable
		v-model="input"
		:rules="[(val) => !!val || 'Harus diisi!']"
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
						label="Daftar grup"
						icon="info"
						flat
						to="/apb/accounts/groups"
					/>
				</q-btn-dropdown>
			</q-card>
		</template>
	</q-select>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useAccountGroupStore } from 'src/stores/apb-account-groups-store';
import { computed, onMounted } from 'vue';

const input = defineModel();
const store = useAccountGroupStore();
const { loading, groups } = storeToRefs(store);

const options = computed(() =>
	groups.value.map((g) => {
		return {
			...g,
			category_name: `${g.category}: ${g.name}`,
		};
	}),
);

const reload = () => store.loadAll(false);

onMounted(async () => {
	if (!groups.value?.length) {
		await reload();
	}
});
</script>
<style lang=""></style>
