import { defineStore } from 'pinia';
import ArrayCrud from 'src/models/ArrayCrud';
import Lists from 'src/models/Lists';
import listData from 'src/stores/lists-data';

function organizeData(data) {
	const organizedData = {};
	data.forEach((item) => {
		organizedData[item.key] = [];
	});

	return organizedData;
}
export { listData };
export const useListsStore = defineStore('lists-input', {
	state: () => {
		return {
			loading: false,
			...organizeData(listData),
		};
		// return {
		// 	domisili: [],
		// 	'hubungan_wali': [],
		// };
	},

	actions: {
		_getState(urlOrKey) {
			return listData.find((item) => item.url === urlOrKey || item.key === urlOrKey);
		},

		async fetchList(url) {
			try {
				this.loading = true;
				const { key } = this._getState(url);
				const data = await Lists.getByKey(url);
				// console.log('🚀 ~ data:', data);
				this[key] = data[key];
			} catch (error) {
				console.log('error get list ', error);
			} finally {
				this.loading = false;
			}
		},

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

		getStateByKey(key, sort = 'asc', primitiveArray = false) {
			if (!primitiveArray) {
				const result = this[key];
				return ArrayCrud.sort(result, 'val0', sort);
			} else {
				const result = this[key].map((v) => v.val0);
				return ArrayCrud.sortPrimitiveArray(result, sort);
			}
		},
	},

	persist: {
		storage: localStorage,
	},
});
