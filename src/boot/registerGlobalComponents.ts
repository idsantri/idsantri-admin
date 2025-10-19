import { defineBoot } from '#q-app/wrappers';
import FormActions from 'src/components/forms/parts/FormActions.vue';
import FormHeader from 'src/components/forms/parts/FormHeader.vue';
import FormLoading from 'src/components/forms/parts/FormLoading.vue';

export default defineBoot(({ app }) => {
	app.component('FormHeader', FormHeader);
	app.component('FormActions', FormActions);
	app.component('FormLoading', FormLoading);
});
