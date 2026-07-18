<template lang="">
	<q-table
		:rows="props.data"
		:columns="columns"
		:rows-per-page-options="[10, 25, 50, 100, 0]"
		flat
		:loading="props.loading"
	>
		<template v-slot:body="props">
			<q-tr :props="props">
				<q-td :props="props" key="val0" v-if="selected.columns.length >= 1">
					{{ props.row.val0 }}
				</q-td>
				<q-td :props="props" key="val1" v-if="selected.columns.length >= 2">
					{{ props.row.val1 }}
				</q-td>
				<q-td :props="props" key="val2" v-if="selected.columns.length >= 3">
					{{ props.row.val2 }}
				</q-td>
				<q-td :props="props" key="id">
					<q-btn
						icon="edit"
						outline
						round
						dense
						glossy
						color="green-10"
						@click="() => emit('handleEdit', props.row)"
					/>
				</q-td>
			</q-tr>
		</template>
	</q-table>
</template>
<script setup>
import { computed } from 'vue';

const emit = defineEmits(['handleEdit']);
const props = defineProps({
	data: {
		type: Array,
		required: true,
	},
	selected: {
		type: Object,
		required: true,
	},
	loading: {
		type: Boolean,
		default: false,
	},
});

const columns = computed(() => {
	const cols = [];
	const len = props.selected.columns?.length || 1;

	if (len >= 1) {
		cols.push({
			name: 'val0',
			label: props.selected.columns[0] || 'Text 1',
			align: 'left',
			field: (row) => `${row.val0}`,
			sortable: true,
		});
	}
	if (len >= 2) {
		cols.push({
			name: 'val1',
			label: props.selected.columns[1] || 'Text 2',
			align: 'left',
			field: (row) => `${row.val1}`,
			sortable: true,
		});
	}
	if (len >= 3) {
		cols.push({
			name: 'val2',
			label: props.selected.columns[2] || 'Text 3',
			align: 'left',
			field: (row) => `${row.val2}`,
			sortable: true,
		});
	}

	cols.push({
		name: 'id',
		label: 'Edit',
		align: 'center',
		field: 'id',
		style: 'width: 90px',
	});

	return cols;
});
</script>
<style scoped>
td {
	white-space: normal;
	word-wrap: break-word;
	padding: 4px 8px;
}
</style>
