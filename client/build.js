const { build } = require('esbuild');
const chokidar = require('chokidar');
const fs = require('fs-extra');
const sassPlugin = require('esbuild-sass-plugin');
const alias = require('esbuild-plugin-alias');
const path = require('path');
const pluginCache = new Map();
const tsConfigExtend = JSON.parse(fs.readFileSync('./tsconfig.extend.json'));

const generateBuild = async () => {
    await fs.rmdirSync('./build/static', { recursive: true });

    await build({
        entryPoints: ['./src/index.jsx'],
        outdir: './build/static/js',
        minify: true,
        bundle: true,
        sourcemap: true,
        // target: ['chrome58', 'firefox57', 'edge16'],
        loader: { '.svg': 'dataurl', '.png': 'dataurl' },
        define: {
            'process.env.NODE_ENV': "'production'",
        },
        plugins: [
            alias({
                // ...tsConfigExtend.compilerOptions.paths,
                '~styles/variables': path.resolve(
                    __dirname,
                    '../../../../src/styles/_variables.scss',
                ),
            }),
            sassPlugin.sassPlugin({
                cache: pluginCache,
                implementation: 'node-sass',
            }),
        ],
    }).catch(() => process.exit(1));

    await fs.move(
        './build/static/js/index.css',
        './build/static/css/index.css',
        (err) => {
            if (err) return console.error(err);
            console.log('success!');
            return null;
        },
    );
};

console.log(tsConfigExtend.compilerOptions.paths);
chokidar
    .watch('.', { ignored: /build|node_modules|.git/ })
    .on('all', (event, path) => {
        console.log(event, path);
        generateBuild();
    });
