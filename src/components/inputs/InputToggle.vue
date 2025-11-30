<template lang="">
	<q-field
		outlined
		:dense="dense"
		:disable="disable"
		:filled="disable"
		:class="$attrs.class === undefined ? 'q-my-sm' : $attrs.class === '' ? null : $attrs.class"
	>
		<template v-slot:control>
			<q-toggle
				v-model="model"
				:true-value="trueValue"
				:false-value="falseValue"
				:dense="dense"
				:label="label"
				checked-icon="check"
				unchecked-icon="clear"
				:color="color"
				:left-label="leftLabel"
				:class="toggleClass"
			/>
			<span v-if="leftLabel" class="q-ml-sm text-italic text-caption">{{ model ? trueText : falseText }}</span>
		</template>
	</q-field>
</template>
<script setup>
const model = defineModel({
	type: [String, Number, Boolean],
	default: 0,
});

defineProps({
	label: { type: String, default: '' },
	trueValue: { type: [String, Number, Boolean], default: 1 },
	falseValue: { type: [String, Number, Boolean], default: 0 },
	trueText: { type: String, default: 'Ya' },
	falseText: { type: String, default: 'Tidak' },
	dense: { type: Boolean, default: true },
	color: { type: String, default: 'green-6' },
	disable: { type: Boolean, default: false },
	leftLabel: { type: Boolean, default: true },
	toggleClass: { type: String, default: '' },
});
</script>
<style lang=""></style>
