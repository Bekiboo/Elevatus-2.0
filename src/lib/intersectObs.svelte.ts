import type { Action } from 'svelte/action'

type Options = {
	root?: HTMLElement | null
	rootMargin?: string
	threshold?: number | number[]
	unobserveOnEnter?: boolean
	onIntersect?: (
		entry: IntersectionObserverEntry,
		node: HTMLElement,
		observer: IntersectionObserver
	) => void
	onLeave?: (
		entry: IntersectionObserverEntry,
		node: HTMLElement,
		observer: IntersectionObserver
	) => void
}

const defaultOptions: Options = {
	root: null,
	rootMargin: '0px',
	threshold: 0,
	unobserveOnEnter: false,
	onIntersect: () => {},
	onLeave: () => {}
}

/**
 * `intersectObs` is a Svelte action that uses the Intersection Observer API to detect when an element is in view.
 *
 * @param {HTMLElement} node - The DOM element to observe.
 * @param {Options} [options={}] - Configuration options for the observer.
 * @returns {Object} - An object containing a `destroy` method to clean up the observer.
 */
export const intersectObs: Action<HTMLElement, Options> = (node, options = {}) => {
	const { root, rootMargin, threshold, unobserveOnEnter, onIntersect, onLeave } = {
		...defaultOptions,
		...options
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					onIntersect?.(entry, node, observer)
					if (unobserveOnEnter) observer.disconnect()
				} else {
					onLeave?.(entry, node, observer)
				}
			})
		},
		{ root, rootMargin, threshold }
	)

	observer.observe(node)

	return {
		destroy() {
			observer.disconnect()
		}
	}
}
