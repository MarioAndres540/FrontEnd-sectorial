import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategoryDto } from './dto';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = URL_SERVICIOS;
  private categoryEndPoint = '/category';

  constructor(private http: HttpClient) {}

  getAll() {}
}
