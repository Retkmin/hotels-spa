import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotelsDto } from '../dtos/hotel.dto';
import { API_CONFIG } from '../../../../core/configuration/api.config';
import { map } from 'rxjs/operators';

/**
 * Basic Hotels API service.
 * - Uses HttpClient
 * - Exposes getHotels() returning Observable<HotelDto[]>
 * - providedIn: 'root' so it's available app-wide
 */
@Injectable({ providedIn: 'root' })
export class HotelsApiService {
	constructor(private http: HttpClient) {}

	/**
	 * Fetch hotels with pagination.
	 * The API returns a wrapper with metadata and `data: Hotel[]`.
	 * Example endpoint: http://localhost:3000/hotels?_page=1&_per_page=25
	 */
	getHotels(page: number, perPage: number): Observable<HotelsDto> {
		const params = new HttpParams()
			.set('_page', String(page))
			.set('_per_page', String(perPage));
		return this.http.get<HotelsDto>(`${API_CONFIG.BASE_URL}/hotels`, { params });
	}

		/**
		 * Fetch hotels with filters and pagination.
		 * Supports filtering by name (contains), stars (array), rate (min), price (max).
		 * WORKAROUND - On version 0.17 of json-server, _limit param is required instead of _per_page also pagination dont send next, prev, last in response
     * Example endpoint: /hotels?_page=1&_limit=25&name_like=foo&stars=3&stars=4&rate_gte=3.7&price_lte=500
		 */
		   getHotelsFiltered(
			   page: number,
			   perPage: number,
			   name?: string,
			   stars?: number[],
			   rate?: number,
			   price?: number
		   ): Observable<HotelsDto> {
			   let params = new HttpParams()
				   .set('_page', String(page))
				   .set('_limit', String(perPage));

			   if (name && name.trim() !== '') {
				   params = params.set('name_like', name.trim());
			   }
			   if (Array.isArray(stars) && stars.length > 0) {
				   stars.forEach(star => {
					   params = params.append('stars', String(star));
				   });
			   }
			   if (typeof rate === 'number') {
				   params = params.set('rate_gte', String(rate));
			   }
			   if (typeof price === 'number') {
				   params = params.set('price_lte', String(price));
			   }

			   return this.http.get<HotelsDto>(`${API_CONFIG.BASE_URL}/hotels`, {
				   params,
				   observe: 'response',
				   headers: { Accept: 'application/json' }
			   }).pipe(
				   map(res => this.buildHotelsDto(res, page, perPage))
			   );

		   }

		   /**
			* Build HotelsDto from HTTP response and pagination params
			*/
		   private buildHotelsDto(res: any, page: number, perPage: number): HotelsDto {
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
}


