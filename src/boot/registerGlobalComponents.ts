import { boot } from 'quasar/wrappers';
import FormHeader from 'src/components/FormHeader.vue';

export default boot(({ app }) => {
	app.component('FormHeader', FormHeader);
});
