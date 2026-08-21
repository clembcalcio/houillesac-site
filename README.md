# Site officiel du Houilles Athletic Club

Ce dépôt contient le site officiel du HAC : [https://houillesac.fr](https://houillesac.fr)

Le site est 100 % statique (HTML, CSS, un peu de JavaScript). Il n'y a aucune base de données, aucun logiciel à installer et aucune étape de compilation.

## Comment est organisé le projet

```
houillesac/
├── site-final/          Le site complet, tel qu'il est publié en ligne
├── netlify.toml         Configuration Netlify
├── README.md            Ce fichier
└── (photos et PDF sources à la racine)
```

Tout ce qui est visible en ligne se trouve dans le dossier `site-final`.

| Page | Fichier |
|---|---|
| Accueil | `site-final/index.html` |
| Le Club | `site-final/le-club/index.html` |
| Histoire | `site-final/le-club/histoire/index.html` |
| Gouvernance | `site-final/le-club/gouvernance/index.html` |
| Notre projet | `site-final/le-club/clement-battistini/index.html` |
| Infrastructures | `site-final/le-club/infrastructures/index.html` |
| Équipes | `site-final/equipes/index.html` |
| Formation | `site-final/formation/index.html` |
| Partenaires | `site-final/partenaires/index.html` |
| Licences | `site-final/licences/index.html` |
| Contact | `site-final/contact/index.html` |
| Mentions légales | `site-final/mentions-legales/index.html` |
| Politique de confidentialité | `site-final/politique-de-confidentialite/index.html` |

## Voir le site sur son ordinateur

Le plus simple : double-cliquer sur `site-final/index.html`. La page s'ouvre dans le navigateur avec son design, ses images et ses polices (le site utilise des chemins relatifs).

Pour naviguer de page en page comme sur le vrai site (les adresses propres du type `/le-club/` demandent un serveur), ouvrir un terminal dans le dossier du projet et lancer :

```bash
cd site-final && python3 -m http.server 8000
```

Puis ouvrir [http://localhost:8000](http://localhost:8000) dans le navigateur.

## Modifier un texte

1. Ouvrir le fichier HTML de la page concernée (voir le tableau ci-dessus) avec n'importe quel éditeur de texte.
2. Chercher le texte à modifier (Ctrl+F ou Cmd+F).
3. Le remplacer, enregistrer, puis publier (voir la section « Publier une modification »).

Règle du site : ne jamais utiliser le tiret long (dit tiret cadratin) dans les textes. Utiliser une virgule, un point ou des deux-points à la place.

## Changer une photo

Les images du site se trouvent dans `site-final/assets/images/`.

Chaque photo existe en deux tailles au format WebP (par exemple `photo-06-tribune-1536.webp` et `photo-06-tribune-800.webp`). Pour remplacer une photo, le plus simple est de remplacer les deux fichiers par de nouvelles images portant exactement les mêmes noms.

## Changer le dossier d'inscription (PDF)

Remplacer le fichier :

```
site-final/documents/dossier-inscription-2026-2027.pdf
```

par le nouveau PDF en lui donnant exactement le même nom. Tous les boutons de téléchargement du site pointeront automatiquement vers le nouveau fichier.

## Ajouter ou modifier un partenaire

Les partenaires apparaissent à deux endroits :

- sur l'accueil : `site-final/index.html`, section repérée par le commentaire `<!-- Partenaires -->`
- sur la page Partenaires : `site-final/partenaires/index.html`, section « Nos partenaires »

Pour ajouter un partenaire : déposer son logo dans `site-final/assets/images/`, puis dupliquer un bloc `<div class="partner-card">...</div>` existant et adapter le nom, le logo et le lien.

## Modifier les dirigeants (Bureau et Conseil d'administration)

Ouvrir `site-final/le-club/gouvernance/index.html` :

- le Bureau est la première liste `people-grid` (nom + fonction)
- le Conseil d'administration est la seconde liste `people-grid` (15 noms)

Ajouter, retirer ou modifier des lignes `<li>...</li>` selon les besoins.

## Modifier les équipes et les divisions

Les divisions apparaissent à deux endroits :

- sur l'accueil : `site-final/index.html`, section « Équipes phares »
- sur la page Équipes : `site-final/equipes/index.html` (pôle performance + autres équipes)

Chaque équipe est une ligne `<li>` avec le nom de l'équipe et sa division. Modifier le texte suffit.

## SEO (référencement)

- Chaque page contient son propre `<title>` et sa `<meta name="description">` en haut du fichier HTML, ainsi qu'une balise `canonical` et des balises Open Graph.
- Les données structurées (JSON-LD) sont dans des blocs `<script type="application/ld+json">` en haut de chaque page. Les principales : le club sur l'accueil, la page profil sur `le-club/clement-battistini/`.
- Le plan du site est `site-final/sitemap.xml`. Si une page est ajoutée ou supprimée, mettre ce fichier à jour.
- Le fichier `site-final/robots.txt` autorise l'indexation et déclare le sitemap.

## Publier une modification (GitHub + Netlify)

Le principe : **modification, puis commit, puis push**. Netlify détecte le push et met le site en ligne automatiquement.

```bash
git add -A && git commit -m "Description de la modification" && git push
```

Une à deux minutes après le push sur la branche `main`, la modification est en ligne sur houillesac.fr.

### Première connexion GitHub (à faire une seule fois)

Le dépôt Git local est déjà prêt. Pour le connecter à GitHub :

1. Créer un dépôt vide nommé `houillesac-site` sur [github.com](https://github.com) (bouton « New repository », visibilité privée recommandée, ne rien cocher d'autre).
2. Dans le terminal, dans le dossier du projet :

```bash
git remote add origin https://github.com/VOTRE-COMPTE/houillesac-site.git && git push -u origin main
```

(Remplacer `VOTRE-COMPTE` par le nom du compte GitHub.)

### Première connexion Netlify (à faire une seule fois)

1. Ouvrir [app.netlify.com](https://app.netlify.com) et se connecter.
2. Cliquer sur « Add new project » puis « Import an existing project ».
3. Choisir GitHub et sélectionner le dépôt `houillesac-site`.
4. Branche : `main`.
5. Vérifier que le « Publish directory » est `site-final` (il est déjà déclaré dans `netlify.toml`).
6. Ne renseigner aucune commande de build : laisser le champ vide.
7. Cliquer sur « Deploy ».
8. Une fois le premier déploiement terminé, aller dans « Domain management » pour connecter le domaine `houillesac.fr`.

## Solution de secours : Netlify Drop

Si besoin de publier sans passer par GitHub : ouvrir [app.netlify.com/drop](https://app.netlify.com/drop) et glisser-déposer le dossier `site-final` entier dans la page. Le site fonctionne immédiatement tel quel.

## Formulaires (contact et partenariat)

Les deux formulaires du site utilisent Netlify Forms :

- `contact` (page Contact)
- `partenariat` (page Partenaires)

Les messages reçus se consultent dans l'interface Netlify : ouvrir le site dans [app.netlify.com](https://app.netlify.com), puis menu « Forms ». On peut y activer une notification par email pour recevoir chaque message dans la boîte du club (Forms, puis « Form notifications »).

Note : les formulaires ne fonctionnent qu'une fois le site hébergé sur Netlify (ils n'envoient rien en local).
