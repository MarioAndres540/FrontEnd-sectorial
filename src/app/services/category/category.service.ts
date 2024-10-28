import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICategoryDto } from './dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  URI: any;
  private apiUrl = URL_SERVICIOS;
  private categoryEndPoint = '/category';

  constructor(private http: HttpClient) {
    this.URI = this.apiUrl + this.categoryEndPoint;
  }

  getAll() {
    return this.http.get<ICategoryDto[]>(`${this.URI}/getAll`).pipe(
      map((resp: ICategoryDto[]) => {
        console.log('service category', resp);
        return resp;
      }),
      catchError((error: any) => {
        return throwError(() => new Error('Error en la solicitud'));
      })
    );
  }

  addTheme(body: any) {
    return this.http.post<ICategoryDto>(`${this.URI}/create`, { body }).pipe(
      map((resp: ICategoryDto) => {
        console.log(resp);
        return resp;
      }),
      catchError((error: any) => {
        return throwError(() => new Error('Error en la solicitud'));
      })
    );
  }
}
