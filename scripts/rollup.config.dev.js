import baseConfig from './rollup.config.base';
import serve from 'rollup-plugin-serve';

import { filename } from '../package.json';

import transBigHumpName from './trans-big-hump-name';
const libName = transBigHumpName(filename);

export default {
  ...baseConfig,
  output: [
    {
      file: `dist/${filename}.js`,
      format: 'iife',
      name: libName,
    },
    {
      file: `dist/${filename}.umd.js`,
      format: 'umd',
      name: libName,
    },
    {
      file: `dist/${filename}.cjs.js`,
      format: 'cjs',
      name: libName,
    },
    {
      file: `dist/${filename}.esm.js`,
      format: 'es',
      name: libName,
    },
  ],
  plugins: [
    ...baseConfig.plugins,
    serve({
      port: 8080,
      contentBase: [''],
    }),
  ],
};
