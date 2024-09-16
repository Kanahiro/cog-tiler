import { build } from 'esbuild';
import { dependencies } from './package.json';

// esm
build({
    bundle: true,
    entryPoints: ['src/index.ts'],
    platform: 'node',
    external: Object.keys(dependencies),
    logLevel: 'info',
    minify: true,
    sourcemap: false,
    format: 'esm',
    outfile: './dist/index.esm.js',
    target: ['ES6'],
});

// cjs
build({
    bundle: true,
    entryPoints: ['src/index.ts'],
    platform: 'node',
    external: Object.keys(dependencies),
    logLevel: 'info',
    minify: true,
    sourcemap: false,
    format: 'cjs',
    outfile: './dist/index.cjs.js',
    target: ['ES6'],
});

// bin
build({
    bundle: true,
    entryPoints: ['src/main.ts'],
    platform: 'node',
    external: Object.keys(dependencies),
    logLevel: 'info',
    minify: true,
    sourcemap: false,
    format: 'cjs',
    outfile: './dist/main.cjs',
    target: ['ES6'],
});
