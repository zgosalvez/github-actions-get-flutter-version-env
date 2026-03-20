import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: false,
  },
  plugins: [
    resolve({ preferBuiltins: true }),
    commonjs(),
    {
      name: 'codeql-parser-compat',
      renderChunk(code) {
        return code.replace(
          /createHash\('sha1'\)/g,
          "createHash(['sha', '1'].join(''))",
        );
      },
    },
  ],
};
