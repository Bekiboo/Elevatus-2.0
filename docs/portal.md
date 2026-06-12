# Portail staff — modules et conventions

_Mis à jour : 2026-06-12_

Le portail (`/portal`, aucun lien depuis le site public) remplace progressivement Kobo Toolbox
et les fichiers Excel pour le suivi MEAL, d'après le cadre d'indicateurs de Rosa Brandon (oct. 2025).

## Modules en place

| Module | Route | Ce qu'il fait |
| --- | --- | --- |
| Connexion | `/portal/login` | email + mot de passe (better-auth), comptes créés par les admins — pas d'inscription publique |
| Tableau de bord | `/portal` | cartes d'accès aux modules |
| Enfants | `/portal/children` | dossiers (identité, genre, naissance), scolarité par année (école, classe, parrainé), résultats de fin d'année (indicateurs 1.1–1.2), archivage |
| Écoles | `/portal/schools` | CRUD des établissements, suppression bloquée si inscriptions |
| Saisie terrain | `/portal/field` | hub mobile-first ↓ |
| → Repas servis | `/portal/field/meals` | registre quotidien par école : servi/pas servi + nombre (indicateur 3.2) ; 14 derniers jours corrigeables |
| → Taille & poids | `/portal/field/growth` | par école et par date de séance, IMC affiché (indicateur 3.1) |
| → Présences centre | `/portal/field/attendance` | moyenne mensuelle par classe + % de remplissage (indicateur 2.1), historique 6 mois |

Comptes : rôle `admin` (Julien) ou `staff` (défaut). Premier admin créé par `node scripts/seed-admin.ts`.

## Conventions du portail

- **Mobile d'abord** pour tout ce qui est terrain : cibles tactiles ≥ 44 px (`h-12`), `text-base` (16 px — pas de zoom iOS), puces d'école défilantes, un formulaire = une action courte. Desktop = grilles `sm:`/`lg:`.
- **Langue** : outils terrain en français ; les écrans purement admin pourront être en anglais. Pas de framework i18n.
- **Saisie numérique** : `inputmode="decimal"` + la validation accepte la **virgule** décimale (`33,5`) — claviers français.
- **Dates terrain** : « aujourd'hui » = fuseau de Madagascar (`Indian/Antananarivo`), helpers dans `src/lib/server/portal.ts`.
- **Validation** : schémas zod dans `src/lib/portal/validation.ts`, tolérants aux champs absents ; les actions renvoient `fail(400, { formId, error })` et chaque formulaire affiche son erreur via `form?.formId`.
- **Écritures répétables** : les registres (repas, mesures, présences) font des **upserts** sur leur clé naturelle (école+date, enfant+date, classe+mois) — re-saisir corrige, jamais de doublon.
- **Sécurité** : guard dans `hooks.server.ts` (couvre pages **et** form actions) ; erreurs Postgres attendues (23505 doublon, 23503 référence disparue) traduites en messages français.
- **Svelte 5** : runes (`$props`, `$state`, `$derived` — y compris writable), `page` depuis `$app/state`. Valider tout composant avec le skill `svelte-code-writer` (autofixer).

## Reste à faire (ordre pressenti)

1. **Enquêtes de confiance** (indicateurs 2.2–2.4) — design à part : auto-évaluation des jeunes 1–5 par trimestre, probablement un mode « kiosque » sans compte.
2. **Blog** — migration des 17 articles de `public.blog-post` vers le schéma `app` + éditeur dans le portail (le rendu public ne change pas) ; ensuite, suppression de `supabase-js` et de l'ancien schéma.
3. **Messages** — le formulaire de contact écrit en base (SendGrid supprimé) ; module de traitement pour les admins, éventuel ping Resend.
4. **Dashboard admin + Stripe** — webhooks (rien aujourd'hui), vue paiements/abonnements, agrégats des indicateurs vs baseline 2026.
5. **Gestion des comptes staff** — créer les accès de l'équipe (Ricardo, Felana, Nanouh) via le plugin admin de better-auth.
6. **Parrainages nominatifs** — UI sur les tables `sponsors`/`sponsorships`.
7. **V2 hors-ligne** — PWA + synchro (les PK uuid et les upserts sont déjà pensés pour).

## Données

- Sauvegarde de l'ancienne base : `backup/*.json` (gitignoré), export du 2026-06-12.
- Années scolaires seedées : 2025–2026, 2026–2027. Classes seedées : couture (25), informatique (15), tutorat (40).
