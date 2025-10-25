import { defineBoot } from '#q-app/wrappers';
import CardHeader from 'src/components/cards/CardHeader.vue';
import CardLoading from 'src/components/cards/CardLoading.vue';
import CardPage from 'src/components/cards/CardPage.vue';
import FormActions from 'src/components/forms/parts/FormActions.vue';
import FormHeader from 'src/components/forms/parts/FormHeader.vue';
import FormLoading from 'src/components/forms/parts/FormLoading.vue';

export default defineBoot(({ app }) => {
	app.component('FormHeader', FormHeader);
	app.component('FormActions', FormActions);
	app.component('FormLoading', FormLoading);
	app.component('CardHeader', CardHeader);
	app.component('CardLoading', CardLoading);
	app.component('CardPage', CardPage);
});
