import { error } from '@sveltejs/kit';

const validYears = ['2013', '2022', '2023', '2024', '2025'];

export function load({ params }) {
	const { year } = params;

	if (!validYears.includes(year)) {
		throw error(404, 'Výsledky nejsou k dispozici');
	}

	return { year };
}
