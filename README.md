# Site de Fabrice Dermience, photographe

Site portfolio statique (Astro), hébergé gratuitement sur Cloudflare Pages, avec un espace admin (Sveltia CMS) sur `/admin` pour que Fabrice ajoute ses projets et ses photos lui-même.

## Pages

- `/` : galerie épurée des projets (au survol, la photo s'assombrit et le titre apparaît).
- `/travaux/` : tous les projets, filtrables par catégorie.
- `/projets/<nom>/` : photos en défilement horizontal, agrandissement au clic, projet suivant.
- `/a-propos/`, `/contact/` (formulaire + WhatsApp + e-mail + Instagram).

## Où sont les contenus

- Projets : `src/content/projets/<nom-du-projet>/index.md` + les photos dans le même dossier.
- Bio, e-mail, téléphone, Instagram : `src/data/site.json`.
- Liste des catégories : `src/data/categories.json` (et la même liste dans `public/admin/config.yml`).

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # site final dans dist/
```

## Mise en ligne (une seule fois)

1. Le code est sur GitHub : `dermienceselect-blip/Dermience-fabrice` (branche `main`).
2. Cloudflare : Workers & Pages > Create > Pages > « Connect to Git » > choisir `Dermience-fabrice`.
   Framework preset **Astro**, Build command `npm run build`, Build output directory `dist`. Cliquer « Save and Deploy ».
3. Le site est en ligne sur `https://dermience-fabrice.pages.dev` (ou l'adresse que Cloudflare affiche).
4. (Recommandé) Acheter `fabricedermience.be` et l'ajouter dans Cloudflare Pages > Custom domains, puis changer `site` dans `astro.config.mjs` et `site_url` dans `public/admin/config.yml`.
5. Formulaire : créer une clé gratuite sur web3forms.com avec `fabricedermience@gmail.com`, puis la coller dans l'admin > Réglages du site > Clé Web3Forms. Sans clé, le formulaire ouvre la messagerie e-mail du visiteur.

## Espace admin (`/admin`)

Connexion par jeton d'accès GitHub (à faire une seule fois sur chaque ordinateur) :

1. Sur GitHub (compte qui a accès au dépôt) : Settings > Developer settings > Personal access tokens > **Fine-grained tokens** > Generate new token.
2. Repository access : « Only select repositories » > `Dermience-fabrice`. Permissions > Repository > **Contents : Read and write**. Durée : 1 an.
3. Copier le jeton, aller sur `/admin`, choisir « Se connecter avec un jeton », coller. C'est fini.
4. Ne jamais envoyer ce jeton par mail ou message : c'est la clé du site.

### Guide pour Fabrice

1. Aller sur `dermience-fabrice.pages.dev/admin` (déjà connecté après la première fois).
2. **Projets > Nouveau projet** : titre, catégorie, petite description.
3. Choisir la photo de couverture, puis ajouter les photos une par une dans « Photos du projet » (glisser-déposer possible).
4. Cocher « À la une » pour qu'il apparaisse en premier sur l'accueil.
5. Cliquer **Enregistrer**. Le site est à jour 1 à 2 minutes plus tard.

Conseil : envoyer des JPEG exportés (pas des RAW). L'admin les réduit automatiquement à 2400 px.

## Sauvegarde

- Chaque modification faite dans l'admin est un « commit » GitHub : tout l'historique est gardé, on peut revenir en arrière.
- En plus, une fois par mois : GitHub > Code > Download ZIP, et ranger le ZIP sur un disque externe ou Google Drive.

## Aperçu hors ligne

`npm run build:apercu` produit `dist-apercu/` avec des liens relatifs (ouvrable sans serveur Astro).
