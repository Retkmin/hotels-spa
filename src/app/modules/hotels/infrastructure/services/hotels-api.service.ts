import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../../core/configuration/api.config';
import { map } from 'rxjs/operators';
import { HotelsDto } from '../../application/dtos/hotel.dto';
import { buildHotelsDto } from '../../application/mappers/hotels-dto.mapper';

@Injectable({ providedIn: 'root' })
export class HotelsApiService {
	constructor(private http: HttpClient) {}

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
        map(res => buildHotelsDto(res, page, perPage))
      );

    }

}


