# Architecture — Elevatus 2.0

_Mis à jour : 2026-06-12_

## Vue d'ensemble

Un seul projet SvelteKit, deux mondes :

- **Site vitrine** (`src/routes/(public)`) — pages marketing, blog, dons Stripe. Public, inchangé visuellement.
- **Portail staff** (`src/routes/portal`) — outil interne de gestion (enfants, écoles, saisie terrain MEAL). Derrière authentification, aucun lien depuis le site public.

| Couche | Choix | Pourquoi |
| --- | --- | --- |
| Framework | SvelteKit 2 + Svelte 5 (runes) | déjà en place, form actions = backend suffisant |
| Base de données | Supabase **utilisé comme simple Postgres managé** | l'existant ; on n'utilise ni son Auth ni son API REST pour le portail |
| ORM | Drizzle (`drizzle-orm` + `drizzle-kit`) | schéma en TypeScript, migrations SQL générées |
| Auth | better-auth (email + mot de passe) | sessions en base, plugin admin, tout dans le code |
| Paiements | Stripe (checkout + portal) | existant |
| Déploiement | Vercel, adaptateur **explicite** `@sveltejs/adapter-vercel` | voir [deployment.md](deployment.md) |

## Base de données : le schéma Postgres `app`

Tout ce que possède le portail vit dans le schéma Postgres **`app`**, pas dans `public` :

- PostgREST (l'API Data de Supabase) n'expose que `public`, `storage`, `graphql_public` → les tables du portail sont **inaccessibles avec la clé publishable**, par construction. Pas de RLS à gérer.
- L'app s'y connecte avec un rôle dédié **`elevatus_app`** (moindre privilège : DML uniquement, pas de DDL), via le pooler Supavisor en mode transaction (port 6543) → `DATABASE_URL`.
- Les migrations s'appliquent avec le rôle `postgres` via le MCP Supabase — jamais via le dashboard.

L'ancien schéma `public` (blog-post, Tags, contact_form, profiles…) est l'héritage du site d'origine ; il alimente encore le blog public et sera migré puis supprimé (voir la roadmap dans [portal.md](portal.md)).

## Modèle de données du portail

Conçu d'après le cadre d'indicateurs MEAL de Rosa Brandon (oct. 2025) :

- **`beneficiaries`** — la table pivot : un enfant/jeune unique à travers les trois piliers (parrainage, centre de jeunes, nutrition).
- **`schools`**, **`school_years`**, **`enrollments`** — la scolarité ; les résultats de fin d'année (`completed_year`, `promoted`) vivent sur l'inscription (indicateurs 1.1, 1.2).
- **`transitions`** — devenir post-bac des diplômés (indicateur 1.3).
- **`sponsors`**, **`sponsorships`** — lien donateur↔enfant (schéma prêt, UI à venir ; `stripe_customer_id` fera le pont avec Stripe).
- **`courses`**, **`course_attendance`** — classes du centre de jeunes (couture 25 / informatique 15 / tutorat 40) et moyenne de présence mensuelle (indicateur 2.1).
- **`meal_days`** — registre quotidien de la cantine par école (indicateur 3.2).
- **`growth_measurements`** — taille/poids → IMC (indicateur 3.1 ; classification OMS par âge à venir).
- Tables better-auth : `user` (avec `role`), `session`, `account`, `verification`.

Conventions : PK `uuid` générées par défaut (générables côté client → prêt pour la synchro hors-ligne v2), `text` plutôt que varchar, `timestamptz`, FK toutes indexées, `created_at`/`updated_at` partout.

## Initialisation paresseuse — règle d'or

**Aucun module ne doit exiger une variable d'environnement à l'import.** Tous les clients (Drizzle/`getDb`, better-auth/`getAuth`, Stripe/`getStripe`, Supabase/`getSupabaseClient`) sont des singletons derrière des fonctions. Raisons :

1. Le build (prérendu du sitemap, phase d'analyse SvelteKit) importe tous les modules serveur — il doit passer **sans aucune** variable d'env.
2. Le site public ne paie jamais le coût (ni le risque) de l'initialisation du portail.

Les hooks (`src/hooks.server.ts`) n'activent l'auth que sur `/portal*` et `/api/auth*`, et portent le **guard d'authentification** (un guard en layout ne couvre pas les form actions).

Particularités better-auth :

- Les options (adapter Drizzle, plugin admin, politique de comptes) vivent dans **`src/lib/server/auth-options.ts`**, factory partagée entre l'app et `scripts/seed-admin.ts` — sans import runtime relatif pour rester exécutable sous Node nu (type-stripping).
- `getSession()` est typé **sans** les champs du plugin admin (`role`, `banned`…) alors que l'objet les contient : `SessionUser` (exporté par `auth.ts`) réinjecte `UserWithRole`, et le hook caste à cette unique frontière.
- L'autorisation par rôle (`requireAdmin`) est décrite dans [portal.md](portal.md#rôles-et-autorisations).

## Variables d'environnement

| Variable | Usage | Où |
| --- | --- | --- |
| `DATABASE_URL` | Postgres via pooler :6543 (rôle `elevatus_app`) | runtime serveur |
| `DATABASE_SESSION_URL` | pooler :5432 (drizzle-kit studio, scripts) | local uniquement |
| `BETTER_AUTH_SECRET` | signature des sessions | runtime serveur |
| `BETTER_AUTH_URL` | origine canonique (`https://www.elevatus-foundation.org`, sans slash final) | runtime serveur |
| `STRIPE_SECRET_KEY` | API Stripe (dons) | runtime serveur |
| `PUBLIC_STRIPE_PUBLISHABLE_KEY` | (réservé, non utilisé par le code actuel) | — |
| `VITE_PUBLIC_SUPABASE_URL` / `VITE_PUBLIC_SUPABASE_ANON_KEY` | blog public via PostgREST (clé `sb_publishable_…`) | **inlinées au build** |

Aucune n'est requise pour que `pnpm run build` passe.
