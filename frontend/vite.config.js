import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
<<<<<<< HEAD
      "@": "/src", 
    },
  },
})
=======
      '@': path.resolve(__dirname, './src'), // Adds alias for "@/"
    },
  },
});
>>>>>>> 5b1135de13d86b1e025e3103482135537217c470
