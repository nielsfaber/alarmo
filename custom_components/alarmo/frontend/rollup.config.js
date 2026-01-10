import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  input: 'src/alarm-panel.ts',
  output: {
    file: 'dist/alarm-panel.js',
    format: 'esm',
    sourcemap: false,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve({ browser: true }),
    typescript(),
    json(),
    //visualizer({ open: true }),
    terser()
  ],
  context: 'window'
};