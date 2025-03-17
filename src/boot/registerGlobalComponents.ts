import { boot } from 'quasar/wrappers';
import FormActions from 'src/components/forms/FormActions.vue';
import FormHeader from 'src/components/forms/FormHeader.vue';

export default boot(({ app }) => {
	app.component('FormHeader', FormHeader);
	app.component('FormActions', FormActions);
});
