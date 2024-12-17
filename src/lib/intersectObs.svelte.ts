import type { Action } from 'svelte/action'

type Options = {
	root?: HTMLElement | null
	rootMargin?: string
	threshold?: number | number[]
	unobserveOnEnter?: boolean
}

const defaultOptions: Options = {
	root: null,
	rootMargin: '0px',
	threshold: 0,
	unobserveOnEnter: false
}

export const intersectObs: Action<HTMLElement, Options> = (
	node: HTMLElement,
	options: Options = {}
) => {
	const { root, rootMargin, threshold, unobserveOnEnter }: Options = {
		...defaultOptions,
		...options
	}
	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						node.dispatchEvent(
							new CustomEvent('inview_change', { detail: { inView: true, entry, node, observer } })
						)
						unobserveOnEnter ? observer.disconnect() : null
						console.log('Element is in view')
					} else {
						console.log('Element is not in view')
					}
				})
			},
			{
				root,
				rootMargin,
				threshold
			}
		)

		observer.observe(node)

		return () => {
			observer.disconnect()
		}
	})
}
