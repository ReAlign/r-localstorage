import filesize from 'rollup-plugin-filesize';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

import baseConfig from './rollup.config.base';
import {
  filename,
  version,
  author,
  license
} from '../package.json';

import transBigHumpName from './trans-big-hump-name';
const libName = transBigHumpName(filename);

// banner
const banner =
  `${'/*!\n' + ' * '}${filename}.js V ${version}\n` +
  ` * (c) 2018-${new Date().getFullYear()} ${author}\n` +
  ` * Released under the ${license} License.\n` +
  ` */`;

// 支持输出 []
export default [
  // .js, .cjs.js, .esm.js
  {
    ...baseConfig,
    output: [
      // umd development version with sourcemap
      // {
      //   file: `dist/${name}.js`,
      //   format: 'umd',
      //   name: libName,
      //   banner,
      // },
      // cjs and esm version
      // {
      //   file: `dist/${name}.cjs.js`,
      //   format: 'cjs',
      //   banner,
      // },
      // // cjs and esm version
      // {
      //   file: `dist/${name}.esm.js`,
      //   format: 'es',
      //   banner,
      // },
    ],
    plugins: [...baseConfig.plugins, filesize()]
  },
  // .min.js
  {
    ...baseConfig,
    output: [
      {
        file: `dist/${filename}.min.js`,
        format: 'iife',
        name: libName,
      },
      {
        file: `dist/${filename}.umd.min.js`,
        format: 'umd',
        name: libName,
      },
      {
        file: `dist/${filename}.cjs.min.js`,
        format: 'cjs',
      },
      {
        file: `dist/${filename}.esm.min.js`,
        format: 'es',
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      uglify(
        {
          compress: {
            drop_console: true,
          },
          mangle: {
            reserved: ['Event'],
          } //不混淆其中某个变量名，其他变量名混淆
        },
        minify,
      ),
      filesize(),
    ],
  },
];
