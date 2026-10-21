import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = import.meta.dirname;

// Importa o arquivo sempre fresco (sem cache do Node) para o dev refletir edições.
const load = (file) => import(pathToFileURL(resolve(root, file)).href + `?t=${Date.now()}`);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Monta <head> e <body> do index.html a partir de site.config.js.
function siteTemplate() {
  return {
    name: 'site-template',
    transformIndexHtml: {
      order: 'pre',
      async handler(html) {
        const { default: config } = await load('site.config.js');
        const { renderPage, themeCss, googleFontsHref } = await load('render.js');
        const head = `
  <title>${esc(config.seo.title)}</title>
  <meta name="description" content="${esc(config.seo.description)}" />
  <meta name="theme-color" content="${esc(config.theme.background)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${googleFontsHref(config.theme.fonts)}" rel="stylesheet">
  <style id="theme-tokens">${themeCss(config.theme)}</style>`;
        return html
          .replace('<html lang="pt-BR">', `<html lang="${esc(config.seo.lang)}">`)
          .replace('<!--HEAD-->', head)
          .replace('<!--BODY-->', renderPage(config));
      }
    },
    // Editar o config ou o gerador recarrega a página inteira.
    handleHotUpdate({ file, server }) {
      if (file.endsWith('site.config.js') || file.endsWith('render.js')) {
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    }
  };
}

export default {
  // Caminhos relativos: funciona em usuario.github.io e em usuario.github.io/repositorio/
  base: './',
  plugins: [siteTemplate()]
};
