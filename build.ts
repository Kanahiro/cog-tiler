import { build } from 'esbuild';
import { dependencies } from './package.json';

const entryFile = 'src/index.ts';

build({
    bundle: true,
    entryPoints: [entryFile],
    platform: 'node',
    external: Object.keys(dependencies),
    logLevel: 'info',
    minify: true,
    sourcemap: false,
    format: 'esm',
    outfile: './dist/index.esm.js',
    target: ['ES6'],
});

build({
    bundle: true,
    entryPoints: [entryFile],
    platform: 'node',
    external: Object.keys(dependencies),
    logLevel: 'info',
    minify: true,
    sourcemap: false,
    format: 'cjs',
    outfile: './dist/index.cjs.js',
    target: ['ES6'],
});
