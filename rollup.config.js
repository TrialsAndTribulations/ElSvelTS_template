import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import copy from 'rollup-plugin-copy';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: "src/frontend/components/main.ts", // check!
	output: {
		sourcemap: true,
		format: "iife",
		name: "app",
		file: "dist/www/build/bundle.js", // check!
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: { dev: !production, },
		}),
		css({ output: "bundle.css" }),
		copy({
			targets: [{
				src: 'src/frontend/www/**/*',
				dest: 'dist/www'
			}]
		}),
		resolve({
			browser: true,
			dedupe: ["svelte"],
		}),
		commonjs(),
		typescript({
			tsconfig: "src/frontend/tsconfig.json", // add and check!
			sourceMap: !production,
			inlineSources: !production,
		}),
		!production && serve(),
		!production && livereload("dist"), // check!
		production && terser(),
	],
	watch: {
		clearScreen: false,
	},
};