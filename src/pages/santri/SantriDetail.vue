<template>
	<CardPage>
		<CardHeader title="Data Santri" @on-reload="loadData" :show-edit="true" @on-edit="editSantri">
			<template #buttons>
				<q-btn
					:label="$q.screen.lt.sm ? '' : 'Cari'"
					@click="searchSantri = true"
					color="green-2"
					no-caps
					dense
					class="q-px-sm text-green-10"
					icon="search"
				/>
				<drop-down-print :santri="santri" />
			</template>
		</CardHeader>

		<q-card-section
			class="tw:flex tw:flex-col tw:sm:flex-row tw:sm:justify-between tw:gap-2 q-pa-sm"
			style="max-width: 1200px"
		>
			<!-- santri -->
			<div class="tw:w-full">
				<CardListTabel class="q-mb-sm" :data="register" :loading="loading" title="Registrasi" />

				<!-- identitas -->
				<CardIdentity
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
				</CardIdentity>
			</div>
			<!-- relations -->
			<div class="tw:w-full">
				<santri-relations :santri-id="santriId" />
			</div>
		</q-card-section>
		<!-- modal -->
		<upload-image
			img-format="jpg"
			:show-uploader="showUploader"
			:url="`/images/santri/${santriId}`"
			@update-uploader="updateUploader"
			@success-upload="successUpload"
		/>
	</CardPage>
</template>
<script setup>
import { ref, toRefs, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { formatDateFull, getAge } from '../../utils/format-date';
import CardIdentity from './CardIdentity.vue';
import UploadImage from 'src/components/ImageUploader.vue';
import santriStore from 'src/stores/santri-store';
import { bacaHijri } from 'src/utils/hijri';
import SantriRelations from 'src/pages/santri/SantriRelations.vue';
import dialogStore from 'src/stores/dialog-store';
import DropDownPrint from './DropDownPrint.vue';
import { storeToRefs } from 'pinia';
import Santri from 'src/models/Santri';
import CardListTabel from 'src/components/cards/CardListTabel.vue';
import { formatAlamatLengkap } from 'src/utils/format-text';
import Image from 'src/models/Image';

const { santri } = storeToRefs(santriStore());
const store = santriStore();
const route = useRoute();
const santriId = route.params.id;

const dialog = dialogStore();
const { searchSantri, crudSantri } = toRefs(dialog);

const loading = ref(false);
const loadingImage = ref(false);

async function loadImage() {
	try {
		loadingImage.value = true;
		const img = await Image.santri(santriId);
		store.setImage(img?.image_url || null);
	} catch (_err) {
		console.error('🚀 ~ loadImage ~ _err:', _err);
	} finally {
		loadingImage.value = false;
	}
}

const umur = computed(() => {
	if (!santri.value?.tgl_lahir) {
		return '-';
	} else {
		const umur = getAge(santri.value.tgl_lahir);
		return umur.tahun + ' tahun, ' + umur.bulan + ' bulan, ' + umur.hari + ' hari';
	}

	getAge(santri.value.tgl_lahir);
});

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
const register = computed(() => {
	return [
		{
			label: 'ID',
			value: santri.value.id,
		},
		{
			label: 'Tanggal Daftar',
			value: formatDateFull(santri.value.tgl_daftar_m) + ' | ' + bacaHijri(santri.value.tgl_daftar_h),
		},
		{
			label: 'Tahun Ajaran',
			value: `${santri.value.th_ajaran_h || '-'} | ${santri.value.th_ajaran_m || '-'}`,
		},
	];
});

const identity = computed(() => ({
	Nama: `${santri.value.nama ? santri.value.nama?.toUpperCase() : ''} (${santri.value.sex?.toUpperCase()})`,
	Alamat: formatAlamatLengkap(
		santri.value.jl,
		santri.value.rt,
		santri.value.rw,
		santri.value.desa,
		santri.value.kecamatan,
		santri.value.kabupaten,
		santri.value.provinsi,
		santri.value.kode_pos,
	),
	Kelahiran: `${santri.value.tmp_lahir || '-'}, ${formatDateFull(santri.value.tgl_lahir)}`,
	Umur: umur.value,
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
