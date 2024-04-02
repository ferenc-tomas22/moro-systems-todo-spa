import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

/** @type {import('vite').UserConfig} */
// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const port = env.VITE_APP_PORT && Number(env.VITE_APP_PORT);

  return {
    plugins: [react()],
    resolve: { alias: { '@': '/src' } },
    server: { open: true, ...(port && { port }) },
    define: { 'process.env': JSON.stringify(env) },
  };
});
