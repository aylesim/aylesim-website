# Setup Sanity CMS

Questa guida ti aiuterà a configurare Sanity per il tuo sito Next.js.

## 1. Crea un progetto Sanity

1. Vai su [sanity.io](https://www.sanity.io) e crea un account gratuito
2. Clicca su "Create new project"
3. Compila il form:
   - **Project name**: Aylesim Website
   - **Dataset name**: production
   - **Plan**: Free (starter)
4. Salva il **Project ID** che ti verrà fornito

## 2. Configura le variabili d'ambiente

Crea un file `.env.local` nella root del progetto con:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=il_tuo_project_id_qui
NEXT_PUBLIC_SANITY_DATASET=production
```

## 3. Configura CORS Origins

Per permettere a Sanity Studio di funzionare correttamente, devi aggiungere le origini CORS nel tuo progetto Sanity:

1. Vai su [sanity.io/manage](https://www.sanity.io/manage)
2. Seleziona il tuo progetto "Aylesim Website"
3. Vai nella sezione **API** > **CORS origins**
4. Clicca su **Add CORS origin**
5. Aggiungi le seguenti origini:
   - **Origin URL**: `http://localhost:3000`
   - **Allow credentials**: ✅ (spunta questa opzione)
   - Clicca **Save**

   Per produzione, aggiungi anche:
   - **Origin URL**: `https://tuodominio.com` (quando avrai il dominio)
   - **Allow credentials**: ✅

## 4. Avvia Sanity Studio

Per accedere all'interfaccia di gestione dei contenuti, avvia il server di sviluppo:

```bash
pnpm dev
```

Poi visita: `http://localhost:3000/admin`

## 4. Schemi configurati

Il progetto include già due schemi:

### Post (Blog)
- Title
- Slug
- Excerpt
- Main Image
- Author
- Published Date
- Body (rich text)
- Tags

### Project
- Title
- Slug
- Description
- Featured Image
- Category (Interactive Systems, Generative Projects, Code & Technology)
- Tags
- Featured (boolean)
- External Link
- GitHub Repository
- Content (rich text)

## 5. Utilizzo

Le funzioni per recuperare i dati da Sanity sono già integrate:

- `getPosts()` - Tutti i post del blog
- `getPostBySlug(slug)` - Singolo post
- `getProjects()` - Tutti i progetti
- `getProjectBySlug(slug)` - Singolo progetto
- `getFeaturedProjects()` - Progetti in evidenza
- `getProjectsByCategory(category)` - Progetti per categoria

Le pagine sono già configurate per utilizzare questi dati:
- `/blog` - Lista dei post
- `/interactive-systems` - Progetti Interactive Systems
- `/generative-projects` - Progetti Generative Projects
- `/` - Mostra i progetti in evidenza

## Note

- Le immagini vengono servite da `cdn.sanity.io` (già configurato in `next.config.ts`)
- I dati vengono cached in produzione per migliorare le performance
- In sviluppo, i dati vengono recuperati fresh ad ogni richiesta

