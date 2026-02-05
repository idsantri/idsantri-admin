<template lang="">
	<q-card-section class="q-pa-sm">
		<q-card bordered flat style="max-width: 600px">
			<q-card-section horizontal>
				<q-card-section class="q-pa-sm">
					<div style="width: 200px">
						<q-img
							:src="`${imageUrl}`"
							:ratio="1"
							alt="user"
							:img-style="{
								border: '1px',
								borderColor: 'green',
								borderStyle: 'solid',
							}"
						/>
						<q-btn
							icon="upload"
							label="Upload"
							no-caps
							dense
							outline
							class="full-width q-mt-md"
							@click="showUploader = true"
						/>
					</div>
				</q-card-section>

				<q-separator vertical />

				<q-card-section class="q-pa-sm">
					<div class="text-subtitle1">Tanda Tangan Pengurus</div>
					<ul class="text-italic q-mt-sm">
						<li>Pastikan gambar sudah transparan</li>
						<li>Gunakan file dengan ekstensi PNG</li>
					</ul>
				</q-card-section>
			</q-card-section>
			<upload-image
				:show-uploader="showUploader"
				:url="`/pulangan/config/${id}/image`"
				:width="200"
				:height="200"
				img-format="png"
				@update-uploader="updateUploader"
				@success-upload="successUpload"
				field-image="p_tt"
			/>
		</q-card>
	</q-card-section>
</template>
<script setup>
import UploadImage from 'src/components/ImageUploader.vue';
import { usePulanganStore } from 'src/stores/pulangan-store';
import { ref } from 'vue';
const store = usePulanganStore();

const props = defineProps({
	p_tt_url: { type: String, required: true },
	id: { type: [String, Number], required: true },
});

const showUploader = ref(false);
const imageUrl = ref(props.p_tt_url);

const updateUploader = (val) => (showUploader.value = val);

async function successUpload(v) {
	showUploader.value = false;
	imageUrl.value = v.pulangan.p_tt_url;
	store.update(props.id, { p_tt_url: v.pulangan.p_tt_url });
}
</script>
<style lang=""></style>
