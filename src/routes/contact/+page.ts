import type { PageLoad } from '../$types';

export const load: PageLoad = async () => {
	// wait 3 seconds
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const data = 'Lalala';
	return {
		props: data
	};
};
