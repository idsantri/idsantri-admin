import { defineStore } from 'pinia';
import listData from 'src/pages/settings/lists/lists-data';

function organizeData(data) {
	const organizedData = {};
	data.forEach((item) => {
		organizedData[item.key] = [];
	});

	return organizedData;
}

export default defineStore('lists-input', {
	state: () => {
		return organizeData(listData);
		// return {
		// 	domisili: [],
		// 	'hubungan_wali': [],
		// };
	},

	getters: {},

	actions: {
		checkState(key) {
			// Check if the state property exists
			if (Object.prototype.hasOwnProperty.call(this.$state, key)) {
				// Property exists
				return true;
			} else {
				// Property doesn't exist
				return false;
			}
		},

		getStateByKey(key) {
			return this[key];
		},

		getStateByKey_Arr(key) {
			return this[key].map((v) => v.val0);
		},
	},

	persist: {
		storage: localStorage,
	},
});
