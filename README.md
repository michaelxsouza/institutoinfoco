# Site Instituto Infoco

Site institucional estático (HTML + CSS + JavaScript puro). Não precisa de build — basta publicar a pasta.

## Estrutura

```
index.html              → página única com todas as seções
css/styles.css          → estilos (cores da marca em :root, no topo do arquivo)
js/config.js            → ★ ÚNICO arquivo que a equipe precisa editar
js/main.js              → comportamento (menu, filtros, modal, formulário)
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

## Antes de publicar — checklist

- [ ] Substituir todos os textos entre colchetes (`[NOME DO CURSO]`, `[CATEGORIA 1]`, etc.)
- [ ] Inserir foto oficial no hero (bloco `visual__photo` no index.html) ou remover o bloco
- [ ] Substituir os depoimentos provisórios por depoimentos reais ou remover a seção
- [ ] Confirmar as respostas das perguntas frequentes
- [ ] Confirmar o texto de atendimento online (`serviceNote`)
- [ ] Adicionar o link do Facebook (`facebookUrl`)
- [ ] Ativar o FormSubmit (primeiro envio de teste)
- [ ] Recomendado: adicionar uma página de Política de Privacidade (LGPD)

## Publicação

Qualquer hospedagem estática funciona: Netlify (arraste a pasta), Vercel, GitHub Pages, Hostinger etc.
