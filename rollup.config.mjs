// rollup.config.mjs
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import {defineConfig} from "rollup"
import clear from 'rollup-plugin-clear'

export default defineConfig({
	input: 'src/index.ts',
	output: [
    {
      file: 'dist/esm/index.js', // 输出文件
      format: 'esm',
    },
    {
      file: 'dist/lib/index.js', // 输出文件
      format: 'cjs'     // 格式，如cjs或esm
    }
  ],
    plugins: [typescript(),terser(),clear({
            targets: ['dist'],
            watch: true,
        })]
});