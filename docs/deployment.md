# Déploiement (Vercel) — runbook

_Mis à jour : 2026-06-12_

## L'essentiel

- Push sur `main` → déploiement Vercel automatique.
- **Toujours valider avant de pousser** : `pnpm check` puis `pnpm run build` puis, pour toute feature serveur, un tour sur `pnpm run preview` (le dev server masque des bugs de build — vécu, voir ci-dessous).
- **Tester l'auth sous preview** : lancer `BETTER_AUTH_URL=http://localhost:4173 pnpm preview --port 4173` — avec le `BETTER_AUTH_URL` du `.env` (port 5173 du dev), better-auth répond **404** sur toutes ses routes (mismatch d'origine), symptôme déroutant vécu le 2026-06-12.
- Adaptateur **explicite** `@sveltejs/adapter-vercel` dans `svelte.config.js` : le pipeline de prod complet (SSR, prérendu, traçage des fonctions) s'exécute donc aussi en local.

## Les cinq pièges déjà rencontrés (et leurs garde-fous)

Session de débogage du 2026-06-12 — chaque fix a révélé le suivant. Ne pas re-tomber dedans :

1. **`pnpm-workspace.yaml` et les versions de pnpm.** Vercel choisit pnpm d'après le lockfile (le pin `packageManager` n'est honoré qu'avec corepack activé) et peut prendre pnpm 9, qui exige un champ `packages:` dans ce fichier. Le nôtre contient les trois dialectes (`packages` pour 9, `onlyBuiltDependencies` pour 10, `allowBuilds` pour 11). Ne pas « nettoyer ».
2. **Node ≥ 22** (`engines.node` dans package.json) — kysely, dépendance de better-auth, l'exige ; le projet Vercel datait de 2022 et tournait en Node 20.
3. **zod 4 partout.** better-auth embarque l'API zod 4 ; mélanger zod 3 et 4 fait planter la phase d'analyse du build SSR. Le projet est en zod ^4.
4. **Jamais de variable d'env exigée au build** (`$env/static/private` sur un module chargé partout, client instancié au niveau module…). Tout passe par les getters paresseux — règle détaillée dans [architecture.md](architecture.md).
5. **`@opentelemetry/api` doit rester en dépendance.** better-auth fait un import dynamique optionnel d'OpenTelemetry ; sans le paquet, vite remplace l'import par un module vide dans le build de prod et **chaque requête auth crashe** (`TypeError … getTracer`) — invisible en dev, où l'import échoue franchement et le fallback no-op de better-auth prend le relais.

## Variables d'environnement Vercel

Liste et rôles dans [architecture.md](architecture.md#variables-denvironnement). Rappels :

- Une variable modifiée n'est prise en compte qu'au **prochain déploiement**.
- `VITE_*` sont inlinées **au build** (les changer ⇒ redéployer).
- Le site public fonctionne même sans les variables du portail — seul `/portal` tombe en erreur.

## Diagnostic

- Logs de build : page du déploiement → onglet **Logs** → section Build.
- Logs runtime : sidebar **Logs**, filtre Error (les 500 du portail y laissent la stack complète).
- Sonde rapide : `curl -s -o /dev/null -w "%{http_code}" https://www.elevatus-foundation.org/portal/login` → `200` attendu.
