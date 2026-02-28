<template lang="">
	<q-page>
		<q-btn @click="reload">load</q-btn>

		<q-separator spaced="" class="q-my-lg" />
		<pre>
	loading: {{ loading }}
</pre
		>
		<pre>{{ options }}</pre>
	</q-page>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useListsStore } from 'src/stores/lists-store';
import { computed, onMounted } from 'vue';
const url = 'domisili';
const store = useListsStore();
const refStore = storeToRefs(store);
const { loading } = refStore;
const options = computed(() => {
	return refStore[url].value;
});
const reload = async () => {
	await store.fetchList(url);
};
onMounted(async () => {
	console.log(options.value);
});
</script>
<style lang=""></style>
