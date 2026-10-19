<template>
	<q-card flat class="full-width">
		<q-inner-loading :showing="loading">
			<q-spinner-dots size="50px" color="green-8" />
		</q-inner-loading>
		<q-card-section class="no-padding">
			<div class="text-subtitle2">User Group (Role)</div>
		</q-card-section>
		<q-card-section class="no-padding">
			<q-list class="" separator>
				<q-item v-for="(group, index) in localGroups" :key="index" class="q-px-none">
					<q-item-section side>
						<q-toggle
							checked-icon="check"
							unchecked-icon="clear"
							:model-value="group.value"
							color="green"
							:disable="!userId"
							@update:model-value="(val) => updateRole(group, index, val)"
						/>
					</q-item-section>
					<q-item-section>
						<q-item-label overline>{{ group.label }}</q-item-label>
						<q-item-label caption>{{ group.description }}</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-card-section>
	</q-card>
</template>
<script setup>
import Users from 'src/models/Users';
import { notifyError } from 'src/utils/notify';
import { ref, watch } from 'vue';

const props = defineProps({
	userId: {
		type: [Number, String],
	},
	groups: {
		type: Array,
		required: true,
	},
	loading: {
		type: Boolean,
		default: false,
	},
});

// copy from props
const localGroups = ref([]);
watch(
	() => props.groups,
	(val) => {
		localGroups.value = [...val];
	},
	{ immediate: true },
);

async function updateRole(group, index, newRole) {
	if (!props.userId) {
		notifyError('User ID tidak ditemukan');
		return;
	}
	// safe: model-value didn't mutate it
	const oldRole = group.value;
	try {
		// optimistic update
		group.value = newRole;
		// update server
		await Users.setRole(props.userId, { role: group.name, value: newRole });
	} catch (err) {
		console.log('error update user role ', err);
		// rollback
		group.value = oldRole;
	}
}
</script>
<style lang=""></style>
