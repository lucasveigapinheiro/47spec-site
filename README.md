# Template de site para estética automotiva

Todo o conteúdo e o visual vêm de **`site.config.js`**. Você não precisa mexer em HTML ou CSS.

## Começar

```bash
npm install
npm run dev      # abre em http://localhost:5173 e recarrega ao salvar o config
npm run build    # gera a pasta dist/ pronta para publicar
```

## O que dá para trocar no `site.config.js`

| Bloco | O que controla |
|---|---|
| `brand`, `seo` | Nome, logo (marca + palavra), rodapé, título e descrição para o Google |
| `theme` | Cor de destaque, fundos, texto e fontes (Google Fonts). Hover e tons escuros saem da cor de destaque |
| `contact`, `location`, `hours` | WhatsApp, Instagram, endereço, links de Maps/Waze e horários. O selo "Aberto agora" é calculado a partir de `hours` |
| `sections`, `navOrder` | Ligar/desligar seções e ordem do menu |
| `hero`, `pillars`, `services`, `comparison`, `simulator` | Textos, listas, pacotes, imagens e opções do simulador de orçamento |
| `footer`, `buttons` | Rodapé e textos de botões |

## Imagens

Coloque os arquivos em `public/images/` e use `'/images/arquivo.jpg'` no config. No comparador, `beforeImage: null` simula riscos sobre a foto "depois"; informe uma foto real para usar o antes de verdade.

## Para ir além

- `render.js` gera o HTML a partir do config (adicione campos ou seções aqui).
- `src/style.css` tem o layout; as cores vêm das variáveis injetadas pelo tema.
- `src/main.js` tem o comportamento (status, menu, comparador, simulador, animações GSAP).

O conteúdo atual do config é o da 47 SPEC, usado como exemplo preenchido.

## Mapa do Google

O bloco de localização usa a **Maps Embed API** quando há chave em `location.googleMapsApiKey` (ou na variável `GOOGLE_MAPS_API_KEY`). Sem chave, aparece o cartão estilizado.

1. Google Cloud Console: crie um projeto e ative **Maps Embed API** (uso gratuito).
2. Credenciais > Criar chave de API.
3. Restrinja a chave: "Referenciadores HTTP" com o seu domínio (e `localhost:*` para testar) e limite a API a Maps Embed API.

A chave aparece no HTML da página; a restrição por domínio é o que a protege.
