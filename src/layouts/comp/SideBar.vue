<template>
	<q-list class="text-green-1">
		<q-item class="q-py-lg" to="/home">
			<q-item-section>
				<LogoCircle style="margin: auto" :size="75" :border="2" />
			</q-item-section>
		</q-item>

		<!-- SEKRETARIAT -->
		<ExpansionItem v-if="sekretariat?.length" label="Sekretariat" caption="Kesantrian" :separator="false">
			<MenuItem v-for="item in sekretariat" :key="item.to" :item="item" />
		</ExpansionItem>

		<!-- MAKHADIYAH -->
		<ExpansionItem v-if="makhadiyah?.length" label="Makhadiyah" caption="Kedaerahan">
			<MenuItem v-for="item in makhadiyah" :key="item.to" :item="item" />
		</ExpansionItem>

		<!-- MADRASAH -->
		<ExpansionItem v-if="madrasah?.length" label="Madrasah" caption="Kemuridan dan Keguruan">
			<MenuItem v-for="item in madrasah" :key="item.to" :item="item" />
		</ExpansionItem>

		<!-- KEAMANAN -->
		<ExpansionItem v-if="keamanan?.length" label="Keamanan" caption="Perizinan dan Pelanggaran">
			<MenuItem v-for="item in keamanan" :key="item.to" :item="item" />
		</ExpansionItem>

		<!-- UGT -->

		<ExpansionItem v-if="ugt?.length" label="UGT" caption="Urusan Guru Tugas">
			<MenuItem v-for="item in ugt" :key="item.to" :item="item" />
		</ExpansionItem>

		<!-- SETTING -->
		<ExpansionItem v-if="setting?.length" label="Pengaturan" caption="Aplikasi dan Pengguna">
			<MenuItem v-for="item in setting" :key="item.to" :item="item" />
		</ExpansionItem>

		<!-- INFO -->
		<ExpansionItem v-if="info?.length" label="Info" caption="Tentang Aplikasi">
			<MenuItem v-for="item in info" :key="item.to" :item="item" />
		</ExpansionItem>
	</q-list>
</template>

<script setup>
import LogoCircle from 'src/components/LogoCircle.vue';
import ExpansionItem from './ExpansionItem.vue';
import MenuItem from './MenuItem.vue';
import { sekretariat, makhadiyah, madrasah, keamanan, ugt, info, setting } from './menus';
</script>
