import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ISubCategoryDto } from './dto';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  URI: any;
  private apiUrl = URL_SERVICIOS;
  private categoryEndPoint = '/subcategory';

  constructor(private http: HttpClient) {
    this.URI = this.apiUrl + this.categoryEndPoint;
  }

  getAll() {
    return this.http.get<ISubCategoryDto[]>(`${this.URI}/list`).pipe(
      map((resp: ISubCategoryDto[]) => {
        console.log(resp);
        return resp;
      }),
      catchError((error: any) => {
        return throwError(() => new Error('Error en la solicitud'));
      })
    );
  }

  addTheme(body: any) {
    return this.http.post<ISubCategoryDto>(`${this.URI}/create`, { body }).pipe(
      map((resp: ISubCategoryDto) => {
        console.log(resp);
        return resp;
      }),
      catchError((error: any) => {
        return throwError(() => new Error('Error en la solicitud'));
      })
    );
  }
}
