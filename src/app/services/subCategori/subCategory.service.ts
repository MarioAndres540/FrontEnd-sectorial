import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISubCategoryDto } from './dto';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  private apiUrl = URL_SERVICIOS;
  private categoryEndPoint = '/category';

  constructor(private http: HttpClient) {}

  getAll() {}
}
