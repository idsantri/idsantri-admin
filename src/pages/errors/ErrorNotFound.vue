<template>
	<div class="fullscreen bg-green text-green-1 text-center q-pa-md flex flex-center">
		<div>
			<div style="font-size: 30vh">404</div>

			<div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

			<q-btn
				class="q-mt-xl q-mr-sm"
				color="green-1"
				text-color="green"
				unelevated
				label="Go Back"
				no-caps
				@click="$router.go(-1)"
			/>
			<q-btn
				class="q-mt-xl q-ml-sm"
				color="green-1"
				text-color="green"
				unelevated
				to="/"
				label="Go Home"
				no-caps
			/>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'ErrorNotFound',
});
</script>
