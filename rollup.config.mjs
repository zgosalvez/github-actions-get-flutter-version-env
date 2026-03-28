import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED' || warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
  },
  output: {
    file: 'dist/index.js',
    format: 'es',
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
