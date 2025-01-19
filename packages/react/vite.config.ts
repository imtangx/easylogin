import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    watch: {
      include: 'src/**', // 监听src目录下的所有文件
    },
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'express', 'axios', 'dotenv'],
    },
  },
  assetsInclude: ['**/*.svg'],
});
