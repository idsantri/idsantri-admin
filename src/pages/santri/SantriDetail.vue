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
					<drop-down-print />
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
	</q-page>
	<!-- <pre>{{ santri }}</pre> -->
</template>
<script setup>
import { reactive, ref, toRefs, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { formatDateFull } from '../../utils/format-date';
import CardColumn from '../../components/CardColumn.vue';
import CardImage from '../../components/CardImage.vue';
import UploadImage from 'src/components/ImageUploader.vue';
import santriStore from 'src/stores/santri-store';
import { bacaHijri } from 'src/utils/hijri';
import SantriRelations from 'src/pages/santri/SantriRelations.vue';
import dialogStore from 'src/stores/dialog-store';
import apiGet from 'src/api/api-get';
import DropDownPrint from './DropDownPrint.vue';

const path = ref(useRoute().fullPath);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function pathIuran() {
	if (path.value.indexOf('iuran-total') != -1) return false;
	if (path.value.indexOf('iuran') != -1) return true;
	return false;
}

const santri = reactive({});
const wali = reactive({});
const ortu = reactive({});

const route = useRoute();
const santriId = route.params.id;

const dialog = dialogStore();
const { searchSantri, crudSantri } = toRefs(dialog);

const register = ref({});
const identity = ref({});
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

async function getSantri() {
	const data = await apiGet({ endPoint: `santri/${santriId}`, loading });
	if (!data.santri) return;
	Object.assign(santri, data.santri);
	Object.assign(wali, data.wali);
	Object.assign(ortu, data.ortu);
}

onMounted(async () => {
	await getSantri();
	// register
	register.value = {
		ID: santri.id,
		'Tanggal Daftar':
			formatDateFull(santri.tgl_daftar_m) +
			' | ' +
			bacaHijri(santri.tgl_daftar_h),
		'Tahun Ajaran': `${santri.th_ajaran_h || '-'} | ${
			santri.th_ajaran_m || '-'
		}`,
	};

	// identity
	identity.value = {
		Nama: `${santri.nama?.toUpperCase()} (${santri.sex?.toUpperCase()})`,
		Alamat: `${santri.jl || ' '} RT ${String(santri.rt || 0).padStart(
			3,
			0,
		)} RW ${String(santri.rw || 0).padStart(3, '0')} ${
			santri.desa || ' '
		} ${santri.kecamatan || ' '} ${santri.kabupaten || ' '} ${
			santri.provinsi || ' '
		} ${santri.kode_pos || ' '}`.replace(/\s\s+/g, ' '),
		Kelahiran: `${santri.tmp_lahir || '-'}, ${formatDateFull(
			santri.tgl_lahir,
		)}`,
		'Data Akhir': santri.data_akhir || '-',
	};

	santriStore().setSantri(santri);
	santriStore().setOrtu(ortu);
	santriStore().setWali(wali);

	// await loadImage();
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
