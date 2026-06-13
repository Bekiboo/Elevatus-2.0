# Portail staff — modules et conventions

_Mis à jour : 2026-06-12_

Le portail (`/portal`, aucun lien depuis le site public) remplace progressivement Kobo Toolbox
et les fichiers Excel pour le suivi MEAL, d'après le cadre d'indicateurs de Rosa Brandon (oct. 2025).

## Modules en place

| Module | Route | Ce qu'il fait |
| --- | --- | --- |
| Connexion | `/portal/login` | email + mot de passe (better-auth), comptes créés par les admins — pas d'inscription publique |
| Tableau de bord terrain | `/portal` | l'état du jour (registres saisis / à faire, date de Madagascar) + accès aux modules — l'accueil des **agents** ; les admins y sont redirigés vers `/portal/admin` |
| Dashboard admin | `/portal/admin` | **en anglais** (Rosa, board) : agrégats par année scolaire (1.1–1.2), cantine 90 j (3.2), couverture taille/poids (3.1), occupation du centre 6 mois (2.1) + dons Stripe lus en direct de l'API — réservé au rôle admin (garde dans `hooks.server.ts`) |
| Mon compte | `/portal/account` | identité, rôle, **déconnexion** (retirée de la barre de nav) + raccourci « Comptes de l'équipe » pour les admins ; plus tard : changement de mot de passe |
| Comptes équipe | `/portal/admin/team` | **en anglais**, réservé admin : création de comptes (mot de passe temporaire généré, affiché une fois), changement de rôle, activation/désactivation, réinitialisation de mot de passe, suppression — via le plugin admin de better-auth |
| Enfants | `/portal/children` | dossiers (identité, genre, naissance), scolarité par année (école, classe, parrainé), résultats de fin d'année (indicateurs 1.1–1.2), archivage |
| Écoles | `/portal/schools` | CRUD des établissements, suppression bloquée si inscriptions |
| Saisie terrain | `/portal/field` | hub mobile-first ↓ |
| → Repas servis | `/portal/field/meals` | registre quotidien par école : servi/pas servi + nombre (indicateur 3.2) ; 14 derniers jours corrigeables |
| → Taille & poids | `/portal/field/growth` | par école et par date de séance, IMC affiché (indicateur 3.1) |
| → Présences centre | `/portal/field/attendance` | moyenne mensuelle par classe + % de remplissage (indicateur 2.1), historique 6 mois |
| → Enquêtes de confiance | `/portal/field/surveys` | auto-évaluation des jeunes 1–5 par trimestre (indicateurs 2.2–2.4) ; saisie agent (nominatif, recherche par nom) ; upsert sur jeune+année+trimestre+énoncé ; énoncés modifiables dans `src/lib/portal/surveys.ts` |

Comptes : rôle `admin` (Julien) ou `staff` (défaut). Premier admin créé par `node scripts/seed-admin.ts`.

## Rôles et autorisations

Politique : **la saisie et les corrections sont ouvertes au staff ; les suppressions
définitives sont réservées aux admins** (le cas normal pour retirer un enfant est
l'_archivage_, pas la suppression).

| Action | staff | admin |
| --- | --- | --- |
| Saisie terrain, fiches, archivage, corrections | ✓ | ✓ |
| Supprimer une fiche enfant (cascade scolarité) | ✗ 403 | ✓ |
| Supprimer une école | ✗ 403 | ✓ |
| Supprimer une inscription **avec résultats saisis** | ✗ 403 | ✓ |
| Supprimer une inscription sans résultats, une entrée repas | ✓ | ✓ |

Côté serveur : `requireAdmin(locals)` (`src/lib/server/portal.ts`) en tête des actions
concernées — la garde UI (boutons masqués selon `data.user.role`) n'est qu'un confort.

## Conventions du portail

- **Mobile d'abord** pour tout ce qui est terrain : cibles tactiles ≥ 44 px (`h-12`), `text-base` (16 px — pas de zoom iOS), puces d'école défilantes, un formulaire = une action courte. Desktop = grilles `sm:`/`lg:`.
- **Langue** : outils terrain en français ; l'espace `/portal/admin` est en anglais (utilisateurs anglophones : Rosa, le board). Pas de framework i18n.
- **Deux mondes, un portail** : les admins ne font pas de saisie terrain — chacun son accueil (`/portal` redirige le rôle admin vers `/portal/admin`), mais Enfants/Écoles/Terrain restent partagés. L'accès à `/portal/admin/*` (pages et actions) est gardé par rôle dans `hooks.server.ts`.
- **Saisie numérique** : `inputmode="decimal"` + la validation accepte la **virgule** décimale (`33,5`) — claviers français.
- **Dates terrain** : « aujourd'hui » = fuseau de Madagascar (`Indian/Antananarivo`), helpers dans `src/lib/server/portal.ts`.
- **Validation** : schémas zod dans `src/lib/portal/validation.ts`, tolérants aux champs absents ; toutes les actions passent par `parseForm(schema, formData, formId)` qui renvoie soit les données typées, soit un `fail(400, { formId, error })` prêt à retourner — chaque formulaire affiche son erreur via `form?.formId`. Les params d'URL (uuid, date) sont validés par `isUuid`/`isIsoDate` avant toute requête (sinon 500 Postgres 22P02).
- **Langage visuel** (refonte 2026-06) : encre pétrole `ink` sur fond `paper` (tokens dans `src/app.css`, dérivés de la palette du site), l'orange de la marque réservé aux accents « maintenant » (onglet actif, aujourd'hui), titres en Saira Extra Condensed (`pageTitle`). Navigation : barre supérieure encre (desktop) + **barre d'onglets en bas sur mobile** (pouce). Le tableau de bord ouvre sur l'état des registres du jour.
- **UI partagée** : classes Tailwind dans `src/lib/portal/ui.ts` (input, boutons, `card`, `pageTitle`), helpers d'affichage dans `src/lib/portal/format.ts` (âge, IMC, dates FR), composants dans `src/lib/components/portal/` (`PageHeader` — titre/retour/actions de chaque page, `Icon` — pictogrammes maison, `SchoolChips` — sélecteur d'école) — pas de copier-coller de styles entre pages.
- **Requêtes bornées** : les loads chargent des fenêtres fixes (14 jours de repas, 6 mois de présences, dernière mesure par enfant via `selectDistinctOn`) — jamais « toute la table » ; les requêtes indépendantes partent en `Promise.all`.
- **Écritures répétables** : les registres (repas, mesures, présences) font des **upserts** sur leur clé naturelle (école+date, enfant+date, classe+mois) — re-saisir corrige, jamais de doublon.
- **Sécurité** : guard dans `hooks.server.ts` (couvre pages **et** form actions) ; erreurs Postgres attendues (23505 doublon, 23503 référence disparue) traduites en messages français.
- **Svelte 5** : runes (`$props`, `$state`, `$derived` — y compris writable), `page` depuis `$app/state`. Valider tout composant avec le skill `svelte-code-writer` (autofixer).

## Reste à faire (ordre pressenti)

1. **Mode kiosque (enquêtes de confiance)** — la saisie agent est faite ; reste le mode kiosque : le jeune répond lui-même sur tablette partagée (code d'ouverture, écran verrouillé, retour à zéro entre deux). Stockage déjà prévu (`survey_responses.via_kiosk`).
2. **Blog** — migration des 17 articles de `public.blog-post` vers le schéma `app` + éditeur dans le portail (le rendu public ne change pas) ; ensuite, suppression de `supabase-js` et de l'ancien schéma.
3. **Messages** — le formulaire de contact écrit en base (SendGrid supprimé) ; module de traitement pour les admins, éventuel ping Resend.
4. **Stripe — historisation** — le dashboard admin lit l'API en direct (v1, fait) ; reste : webhooks pour historiser les paiements en base, rapprochement donateur↔parrainage, comparaison vs baseline 2026.
5. **Parrainages nominatifs** — UI sur les tables `sponsors`/`sponsorships`.
6. **V2 hors-ligne** — PWA + synchro (les PK uuid et les upserts sont déjà pensés pour).

_Fait : gestion des comptes staff (`/portal/admin/team`) ; enquêtes de confiance — saisie agent (`/portal/field/surveys`, indicateurs 2.2–2.4) + agrégat par trimestre sur le dashboard admin._

## Données

- Sauvegarde de l'ancienne base : `backup/*.json` (gitignoré), export du 2026-06-12.
- Années scolaires seedées : 2025–2026, 2026–2027. Classes seedées : couture (25), informatique (15), tutorat (40).
