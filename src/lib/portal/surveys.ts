// Enquêtes de confiance — auto-évaluation des jeunes du centre (indicateurs
// 2.2–2.4 du cadre MEAL de Rosa Brandon). Tout le contenu modifiable vit ici :
// on peut réécrire les énoncés avec Rosa sans toucher au schéma ni aux pages.
//
// Modèle : une note 1–5 par énoncé, par jeune et par trimestre d'année scolaire.
// Les libellés ci-dessous sont une première version raisonnable, à valider.

export const SURVEY_QUESTIONS = [
	{
		key: '2.2',
		title: 'Confiance en soi',
		enTitle: 'Self-confidence',
		statement: "J'ai confiance en moi et en ce que je sais faire."
	},
	{
		key: '2.3',
		title: 'Compétences & avenir',
		enTitle: 'Skills & future',
		statement: "Ce que j'apprends au centre me prépare pour mon avenir."
	},
	{
		key: '2.4',
		title: 'Place dans le groupe',
		enTitle: 'Belonging',
		statement: 'Je me sens écouté·e et à ma place au centre.'
	}
] as const

export type SurveyQuestionKey = (typeof SURVEY_QUESTIONS)[number]['key']
export const SURVEY_QUESTION_KEYS: readonly string[] = SURVEY_QUESTIONS.map((q) => q.key)

// Échelle d'accord 1–5, pensée pour une lecture rapide et le mode kiosque :
// un visage + un mot, du moins au plus. Le visage aide les jeunes les moins à
// l'aise avec l'écrit (jeunes malgaches de la campagne).
export const SURVEY_SCALE = [
	{ value: 1, label: 'Pas du tout', face: '😟' },
	{ value: 2, label: 'Un peu', face: '🙁' },
	{ value: 3, label: 'Moyen', face: '😐' },
	{ value: 4, label: 'Beaucoup', face: '🙂' },
	{ value: 5, label: 'Tout à fait', face: '😄' }
] as const

export const SURVEY_TERMS = [
	{ value: 1, label: 'Trimestre 1' },
	{ value: 2, label: 'Trimestre 2' },
	{ value: 3, label: 'Trimestre 3' }
] as const

export function isSurveyTerm(n: number): boolean {
	return n === 1 || n === 2 || n === 3
}

export function termLabel(term: number): string {
	return SURVEY_TERMS.find((t) => t.value === term)?.label ?? `Trimestre ${term}`
}
