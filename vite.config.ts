import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Ensures assets load correctly on GitHub Pages under any repository path
  plugins: [react(), tailwindcss()],
});
