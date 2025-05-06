<template lang="">
	<div class="flex justify-between items-center">
		<div>
			<div class="text-italic text-weight-light">
				Nomor WA Customer Service:
			</div>
			<div v-if="isEdit">
				<q-form
					@submit.prevent="onSubmit"
					class="flex items-start q-gutter-x-sm"
				>
					<q-input
						v-model="inputCs"
						outlined
						dense
						label="Nomor WA"
						:disable="loading"
						clearable
						placeholder="628xxxx"
						:rules="[
							(val) => !val || !isNaN(val) || 'Hanya angka!',
						]"
					/>
					<q-btn
						type="submit"
						color="green-10"
						outline
						no-caps
						:disabled="loading"
						class="q-px-sm"
						:loading="loading"
						icon="save"
						label="Simpan"
					/>
				</q-form>
			</div>
			<div v-else>
				<div v-if="loading">
					<q-skeleton />
				</div>
				<div v-else-if="cs === '' || cs === null">
					<div class="">Belum diatur</div>
				</div>
				<div v-else>
					<div class="text-weight-bold">
						{{
							cs.replace(
								/(\d{2})(\d{3})(\d{4})(\d{4})/,
								'$1 $2-$3-$4',
							)
						}}
					</div>
				</div>
			</div>
		</div>
		<q-btn
			dense
			class="q-px-sm"
			:icon="isEdit ? 'close' : 'edit'"
			outline
			:label="isEdit ? 'Batal' : 'Edit'"
			no-caps
			@click="onEdit"
		/>
	</div>
</template>
<script setup>
import apiGet from 'src/api/api-get';
import apiPost from 'src/api/api-post';
import { onMounted, ref } from 'vue';

const isEdit = ref(false);
const inputCs = ref('');
const loading = ref(false);
const cs = ref('');

async function fetchData() {
	const data = await apiGet({
		endPoint: 'config/app-wali/cs',
		loading: loading,
	});
	if (data && data.cs) {
		cs.value = data.cs;
	}
}

onMounted(async () => {
	await fetchData();
});

const onSubmit = async () => {
	const res = await apiPost({
		endPoint: 'config/app-wali/cs',
		loading: loading,
		data: { cs: inputCs.value },
	});
	if (res) {
		cs.value = res.cs;
		isEdit.value = false;
	}
};

const onEdit = () => {
	inputCs.value = cs.value;
	isEdit.value = !isEdit.value;
};
</script>
<style lang=""></style>
