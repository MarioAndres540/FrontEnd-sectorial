import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { ThemeserviceService } from './services/theme/themeservice.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CategoryComponent } from './components/category/category.component';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

export interface PeriodicElement {
  position: number;
  name: string;
  active: boolean;
  creationDate: Date;
  subCategory: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    active: true,
    creationDate: new Date('2024-10-07'),
    subCategory: 'x tema',
  },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatProgressSpinnerModule,
    CategoryComponent,
    CommonModule,
    MatTabsModule,
    FormsModule,
    MatTableModule,
    MatIcon,
  ],
  providers: [ThemeserviceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'FrontEnd-sectorial';

  showSpinner = true;

  constructor(private themeService: ThemeserviceService) {
    setTimeout(() => {
      this.showSpinner = false;
    }, 3000);
  }

  ngOnInit(): void {
    this.listThemes();
  }

  listThemes(): void {
    console.log('entre en list');

    try {
      this.themeService.getAll().subscribe({
        next: (data: any) => {
          console.log('data', data);
        },
        error: (error: Error) => {
          console.log('error', error);
        },
      });
    } catch (error) {}
  }

  columns = [
    {
      columnDef: 'Position',
      header: 'No.',
      cell: (element: PeriodicElement) => `${element.position}`,
    },
    {
      columnDef: 'Nombre',
      header: 'Nombre',
      cell: (element: PeriodicElement) => `${element.name}`,
    },
    {
      columnDef: 'Activo',
      header: 'Estado',
      cell: (element: PeriodicElement) => `${element.active}`,
    },
    {
      columnDef: 'FechaCreacion',
      header: 'Fecha de cracion',
      cell: (element: PeriodicElement) => `${element.creationDate}`,
    },
    {
      columnDef: 'SubCategoria',
      header: 'Sub Categoria',
      cell: (element: PeriodicElement) => `${element.subCategory}`,
    },
  ];
  dataSource = ELEMENT_DATA;
  displayedColumns = this.columns.map((c) => c.columnDef);
}
