import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    watch: {
      include: 'src/**'  // 监听src目录下的所有文件
    },
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['express', 'axios', 'dotenv']
    }
  }
});