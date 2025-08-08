// https://github.com/michael-ciniawsky/postcss-load-config
import autoprefixer from 'autoprefixer';
import tailwindcss from '@tailwindcss/postcss'; /** Add this  */

export default {
	plugins: [
		// to edit target browsers: use "browserslist" field in package.json
		autoprefixer,
		tailwindcss,
	],
};
