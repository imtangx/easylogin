import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    watch: {
      include: 'src/**', // 监听src目录下的所有文件
    },
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'umd'],
      name: 'GoogleLogin',
      fileName: format => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: [],
    },
  }
});
