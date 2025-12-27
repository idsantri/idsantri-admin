<template lang="">
	<CardPage>
		<CardHeader title="Detail Akun" @onReload="reload" :show-edit="true" @onEdit="showForm = true"> </CardHeader>

		<q-card-section class="q-pa-sm" :key="key">
			<q-card flat bordered>
				<CardLoading :showing="loading" message="" size="4em" />
				<CardAccount :account="account" @update="toggle" />
			</q-card>
			<q-card flat bordered class="q-mt-sm">
				<CardHistory :account_id="account?.id" />
			</q-card>
		</q-card-section>
		<q-dialog persistent="" v-model="showForm">
			<ApbAccountForm
				:data="account"
				@success-submit="addToState"
				@success-delete="
					() => {
						state.remove(account.id);
						$router.go(-1);
					}
				"
			/>
		</q-dialog>
	</CardPage>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import apbAccountsStore from 'src/stores/apb-accounts-store';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CardAccount from './CardAccount.vue';
import CardHistory from './CardHistory.vue';
import ApbAccountForm from 'src/components/forms/ApbAccountForm.vue';

const params = useRoute().params;
const router = useRouter();
const state = apbAccountsStore();
const { loading, accounts } = storeToRefs(state);
const { loadById, toggleHidden, add, remove } = state;
const key = ref(0);
const account = computed(() => accounts.value.find((item) => item.id == params.id));
const showForm = ref(false);

const reload = async () => {
	await loadById(params.id);
	key.value++;
};
const addToState = async (data) => {
	add(data);
	if (data.id != account.value.id) {
		remove(account.value.id);
		router.replace(`/apb/accounts/${data.id}`);
	}
};

const toggle = async (v) => {
	await toggleHidden(v.hidden, v.id);
};

onMounted(async () => {
	if (!account.value) await reload();
});
</script>
<style lang="scss" scoped>
td {
	white-space: normal;
	word-wrap: break-word;
}
</style>
