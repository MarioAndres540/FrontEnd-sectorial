import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IthemeDto } from './dto';

@Injectable({
  providedIn: 'root',
})
export class ThemeserviceService {
  URI: any;
  private apiUrl = URL_SERVICIOS;
  private categoryEndPoint = '/theme';

  constructor(private http: HttpClient) {
    this.URI = this.apiUrl + this.categoryEndPoint;
  }

  getAll() {
    console.log('entre getall');
    console.log(`${this.URI}/list`);

    return this.http.get<IthemeDto>(`${this.URI}/list`).pipe(
      map((resp: IthemeDto) => {
        console.log(`${this.URI}/list`);

        console.log(resp);
        return resp;
      }),
      catchError((error: any) => {
        return throwError(() => new Error('Error en la solicitud'));
      })
    );
  }
}
