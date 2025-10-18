<template>
	<q-page class="q-pa-sm">
		<q-card class="">
			<q-card-section class="bg-green-8 text-green-11 q-pa-sm">
				<div class="flex items-center">
					<div class="text-subtitle1">Data Santri</div>
					<q-space />
					<q-btn
						@click="null"
						size="sm"
						color="green-2"
						class="text-green-10 q-mr-sm"
						icon="sync"
						disable
					/>
					<q-btn
						label="Cari"
						@click="searchSantri = true"
						size="sm"
						color="green-2"
						class="text-green-10 q-mr-sm"
						icon="search"
					/>
					<q-btn
						no-caps
						size="sm"
						color="green-2"
						class="text-green-10 q-mr-sm"
						icon="edit"
						label="Edit"
						@click="editSantri"
					/>
					<drop-down-print :santri="santri" />
				</div>
			</q-card-section>
			<q-card-section class="no-padding">
				<div class="row">
					<!-- santri -->
					<div class="col-12 col-sm-6 col-md-4 q-pa-sm">
						<card-column
							class="q-mb-sm"
							:data="register"
							:loading="loading"
							title="Registrasi"
						/>

						<!-- identitas -->
						<card-image
							class="q-mb-sm"
							title="Identitas"
							:data="identity"
							:loading="loading"
							:loadingImage="loadingImage"
							:image="santri?.image_url || '/user-default.png'"
						>
							<template #button>
								<q-btn
									class="q-mt-sm full-width"
									icon="upload"
									no-caps=""
									label="Foto"
									dense=""
									size="sm"
									outline=""
									color="green-10"
									@click="showUploader = true"
								/>
							</template>
						</card-image>
					</div>

					<!-- relations -->
					<div class="col-12 col-sm-6 col-md-5 q-pa-sm">
						<santri-relations :santri-id="santriId" />
					</div>
				</div>
			</q-card-section>
		</q-card>
		<!-- modal -->
		<upload-image
			img-format="jpg"
			:show-uploader="showUploader"
			:url="`/images/santri/${santriId}`"
			@update-uploader="updateUploader"
			@success-upload="successUpload"
		/>
		<!-- <pre>{{ santri }}</pre> -->
	</q-page>
</template>
<script setup>
import { ref, toRefs, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { formatDateFull } from '../../utils/format-date';
import CardColumn from '../../components/CardColumn.vue';
import CardImage from './CardImage.vue';
import UploadImage from 'src/components/ImageUploader.vue';
import santriStore from 'src/stores/santri-store';
import { bacaHijri } from 'src/utils/hijri';
import SantriRelations from 'src/pages/santri/SantriRelations.vue';
import dialogStore from 'src/stores/dialog-store';
import apiGet from 'src/api/api-get';
import DropDownPrint from './DropDownPrint.vue';
import { storeToRefs } from 'pinia';
import Santri from 'src/models/Santri';

const { santri } = storeToRefs(santriStore());

const route = useRoute();
const santriId = route.params.id;

const dialog = dialogStore();
const { searchSantri, crudSantri } = toRefs(dialog);

const loading = ref(false);
const loadingImage = ref(false);

async function loadImage() {
	const img = await apiGet({
		endPoint: `images/santri/${santriId}`,
		loading: loadingImage,
	});
	// console.log(img.image_url);
	santri.image_url = img.image_url;
}

async function loadData() {
	santriStore().$reset();
	try {
		loading.value = true;
		const data = await Santri.getById({
			id: santriId,
		});
		if (data) {
			santriStore().setSantri(data.santri);
			santriStore().setOrtu(data.ortu);
			santriStore().setWali(data.wali);
		}
	} catch (_err) {
		// console.error('err ', _err);
	} finally {
		loading.value = false;
	}
}

const register = computed(() => ({
	ID: santri.value.id,
	'Tanggal Daftar':
		formatDateFull(santri.value.tgl_daftar_m) +
		' | ' +
		bacaHijri(santri.value.tgl_daftar_h),
	'Tahun Ajaran': `${santri.value.th_ajaran_h || '-'} | ${
		santri.value.th_ajaran_m || '-'
	}`,
}));

const identity = computed(() => ({
	Nama: `${santri.value.nama?.toUpperCase()} (${santri.value.sex?.toUpperCase()})`,
	Alamat: `${santri.value.jl || ' '} RT ${String(
		santri.value.rt || 0,
	).padStart(3, 0)} RW ${String(santri.value.rw || 0).padStart(3, '0')} ${
		santri.value.desa || ' '
	} ${santri.value.kecamatan || ' '} ${santri.value.kabupaten || ' '} ${
		santri.value.provinsi || ' '
	} ${santri.value.kode_pos || ' '}`.replace(/\s\s+/g, ' '),
	Kelahiran: `${santri.value.tmp_lahir || '-'}, ${formatDateFull(
		santri.value.tgl_lahir,
	)}`,
	'Data Akhir': santri.value.data_akhir || '-',
}));

onMounted(async () => {
	await loadData();
});

/**
 * send to modal edit
 */
function editSantri() {
	santriStore().setEdit();
	crudSantri.value = true;
}

// uploader
const showUploader = ref(false);
const updateUploader = (value) => (showUploader.value = value);

async function successUpload() {
	showUploader.value = false;
	await loadImage();
}
</script>
