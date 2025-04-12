<template lang="">
	<div class="flex justify-between items-center">
		<div>
			<div class="text-italic text-weight-light">
				Nomor WA Customer Service:
			</div>
			<div v-if="isEdit">
				<q-input
					type="number"
					v-model="inputCs"
					outlined
					dense
					label="Nomor WA"
					:disable="loading"
					clearable
					placeholder="628xxxx"
				>
					<template v-slot:after>
						<q-btn
							color="green-10"
							outline
							no-caps
							:disabled="loading"
							class="q-px-sm"
							@click="onSubmit"
							:loading="loading"
							icon="save"
							label="Simpan"
						/>
					</template>
				</q-input>
			</div>
			<div v-else>
				<div v-if="props.cs">
					<div class="text-weight-bold">
						{{
							props?.cs.replace(
								/(\d{2})(\d{3})(\d{4})(\d{4})/,
								'$1 $2-$3-$4',
							)
						}}
					</div>
				</div>
				<div v-else>
					<div class="">Belum diatur</div>
				</div>
			</div>
		</div>
		<q-btn icon="edit" flat @click="onEdit" />
	</div>
</template>
<script setup>
import apiPost from 'src/api/api-post';
// import { notifyError } from 'src/utils/notify';
import { ref } from 'vue';

const emit = defineEmits(['onUpdate']);
const props = defineProps({ cs: String });
const isEdit = ref(false);
const inputCs = ref('');
const loading = ref(false);

const onSubmit = async () => {
	// // number only
	// if (!/^-?\d+$/.test(inputCs.value)) {
	// 	notifyError(
	// 		'<ul><li>Input tidak valid!</li><li>Input hanya menerima angka</li></ul>',
	// 	);
	// 	return;
	// }
	const res = await apiPost({
		endPoint: 'config/app-wali/cs',
		loading: loading,
		data: { cs: inputCs.value },
	});
	if (res) {
		emit('onUpdate', res.cs);
		isEdit.value = false;
	}
};

const onEdit = () => {
	inputCs.value = props.cs;
	isEdit.value = !isEdit.value;
};
</script>
<style lang=""></style>
