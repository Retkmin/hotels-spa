import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotelsDto } from '../dtos/hotel.dto';
import { API_CONFIG } from '../../../../core/configuration/api.config';

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
}


