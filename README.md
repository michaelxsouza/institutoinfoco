# Site Instituto Infoco

Site institucional estático (HTML + CSS + JavaScript puro). Não precisa de build — basta publicar a pasta.

## Estrutura

```
index.html              → página única com todas as seções
css/styles.css          → estilos (cores da marca em :root, no topo do arquivo)
js/config.js            → ★ ÚNICO arquivo que a equipe precisa editar
js/main.js              → comportamento (menu, filtros, modal, formulário)
js/lp.js                → comportamento das páginas de captura
css/lp.css              → estilos das páginas de captura
scripts/gerar-lps.js    → gera as páginas de captura a partir do config.js
cursos/                 → páginas de captura (geradas — não edite à mão)
assets/img/             → logotipo oficial e favicon
```

## Como editar o conteúdo (js/config.js)

- **Contatos** → objeto `instituteContact`. Cole o link da página do Facebook em `facebookUrl` para ativar o ícone.
- **Cursos** → array `courses`. Copie um bloco `{ ... }` para adicionar. Deixe `duration` / `modality` como `""` para ocultar dados não confirmados. Os filtros por categoria são gerados automaticamente.
- **Perguntas frequentes** → array `faqs`.
- **Depoimentos** → array `testimonials`. Use apenas depoimentos reais e autorizados; defina `placeholder: false` para remover o selo "Provisório".

## Formulário de leads

Configurado em `formSettings` (config.js):

| provider | O que faz |
|---|---|
| `"formsubmit"` (padrão) | Envia o lead para **inst.infoco@gmail.com** via FormSubmit.co (gratuito). No **primeiro envio**, chega um e-mail de ativação — clique em *Activate Form* uma única vez. |
| `"custom"` | Envia um POST JSON para `customEndpoint` (API própria, Make, Zapier, n8n, Supabase...). |
| `"whatsapp"` | Abre o WhatsApp com a mensagem já preenchida. |

Após o envio, o visitante vê a mensagem de sucesso e o botão **Continuar pelo WhatsApp** (com os dados preenchidos). Se o envio por e-mail falhar, o site oferece o WhatsApp para o lead não ser perdido.

Inclui: validação de todos os campos, máscara de telefone, validação de e-mail, honeypot anti-spam, checkbox de consentimento (LGPD) e eventos `generate_lead` (Google Analytics) / `Lead` (Meta Pixel) caso esses scripts sejam adicionados.

## Páginas de captura por curso (Google Ads)

Cada curso tem uma página própria em `cursos/<nome-do-curso>/`, feita para receber tráfego de anúncios:
sem menu, formulário no topo, preço, etapas, requisitos, FAQ e botão fixo no celular.

- **Gerar / atualizar as páginas:** depois de mudar qualquer coisa em `js/config.js`, rode
  `node scripts/gerar-lps.js`. As 25 páginas, `obrigado/` e `politica-de-privacidade/` são recriadas.
- **URLs para os anúncios:** ficam em `cursos/lista-de-urls.csv` (abre no Excel).
  Preencha `lpSettings.siteUrl` para a lista sair com o domínio certo.
- **Texto de cada profissão:** `courseDetails` em `js/config.js`.
- **Qualificação do lead:** o formulário pergunta Ensino Médio e tempo de experiência na área.
- **Origem do lead:** `utm_*` e `gclid` da URL vão junto no e-mail do lead.

### Conversão no Google Ads

1. No Google Ads, crie uma conversão do tipo **Site → Envio de formulário de lead**.
2. Copie o ID (`AW-...`) e o rótulo da conversão para `lpSettings.tracking` em `js/config.js`.
3. Rode `node scripts/gerar-lps.js` de novo e publique.

Depois do envio do formulário, o visitante vai para `obrigado/`, onde a conversão é registrada uma única vez.
Cliques no WhatsApp também podem virar conversão com `whatsappConversionLabel`.

## Antes de publicar — checklist

- [ ] Substituir todos os textos entre colchetes (`[NOME DO CURSO]`, `[CATEGORIA 1]`, etc.)
- [ ] Inserir foto oficial no hero (bloco `visual__photo` no index.html) ou remover o bloco
- [ ] Substituir os depoimentos provisórios por depoimentos reais ou remover a seção
- [ ] Confirmar as respostas das perguntas frequentes
- [ ] Confirmar o texto de atendimento online (`serviceNote`)
- [ ] Adicionar o link do Facebook (`facebookUrl`)
- [ ] Ativar o FormSubmit (primeiro envio de teste)
- [ ] Revisar a Política de Privacidade (`politica-de-privacidade/`) com a instituição
- [ ] Preencher `lpSettings` (domínio e IDs do Google Ads) e rodar `node scripts/gerar-lps.js`

## Publicação

Qualquer hospedagem estática funciona: Netlify (arraste a pasta), Vercel, GitHub Pages, Hostinger etc.
