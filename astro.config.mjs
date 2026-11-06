import { defineConfig } from 'astro/config';
const apercu = !!process.env.APERCU;
export default defineConfig({
  site: 'https://dermience-fabrice.pages.dev',
  build: { format: apercu ? 'file' : 'directory', assets: 'assets' },
  image: { responsiveStyles: false },
});
