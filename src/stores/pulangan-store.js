import { defineStore } from 'pinia';
import ArrayCrud from 'src/models/ArrayCrud';
import Pulangan from 'src/models/PulanganConfig';

export const usePulanganStore = defineStore('pulangan-store', {
	state: () => ({
		loading: false,
		pulangan: [],
	}),

	getters: {},

	actions: {
		async loadAll() {
			try {
				this.loading = true;
				const response = await Pulangan.getAll();
				this.pulangan = response.pulangan;
			} catch (error) {
				console.log('🚀 ~ reload ~ error:', error);
			} finally {
				this.loading = false;
			}
		},
		async loadById(id) {
			try {
				this.loading = true;
				const response = await Pulangan.getById({ id });
				const { pulangan } = response;
				this.pulangan = ArrayCrud.updateOrCreate(this.pulangan, pulangan, 'id');
			} catch (error) {
				console.log('🚀 ~ reload ~ error:', error);
			} finally {
				this.loading = false;
			}
		},

		async updateById(id, data) {
			try {
				this.loading = true;
				const response = await Pulangan.update({ id, data });
				const { pulangan } = response;
				this.pulangan = ArrayCrud.update(this.pulangan, id, pulangan);
			} catch (error) {
				console.log('🚀 ~ reload ~ error:', error);
			} finally {
				this.loading = false;
			}
		},

		update(id, data) {
			this.pulangan = ArrayCrud.update(this.pulangan, id, data);
		},

		remove(id) {
			this.pulangan = ArrayCrud.remove(this.pulangan, id);
		},

		create(data) {
			this.pulangan = ArrayCrud.create(this.pulangan, data);
		},

		upsert(data) {
			this.pulangan = ArrayCrud.updateOrCreate(this.pulangan, data, 'id');
		},
	},

	persist: {
		storage: sessionStorage,
	},
});
