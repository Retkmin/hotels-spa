import { HotelsDto } from "../dtos/hotel.dto";

export function buildHotelsDto(res: any, page: number, perPage: number): HotelsDto {
	const totalItems = +(res.headers.get('X-Total-Count') || 0);
	const last = perPage > 0 ? Math.ceil(totalItems / perPage) : 1;
	const next = page < last ? page + 1 : null;
	const prev = page > 1 ? page - 1 : null;
	return {
		data: res.body,
		pages: last,
		first: 1,
		items: totalItems,
		last,
		next,
		prev
	};
}
