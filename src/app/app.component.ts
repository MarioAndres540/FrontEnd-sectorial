import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { ThemeserviceService } from './services/theme/themeservice.service';
import { SubcategoryService } from './services/subCategori/subcategory.service';
import { CategoryService } from './services/category/category.service';
import { ThemesComponent } from './components/themes/themes.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CategoryComponent } from './components/category/category.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { IthemeDto } from './services/theme/dto';
import { ISubCategoryDto } from './services/subCategori/dto';
import { ICategoryDto } from './services/category/dto';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
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
    ReactiveFormsModule,
  ],
  providers: [ThemeserviceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'FrontEnd-sectorial';
  showSpinner = true;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  columns: any[] = [];

  constructor(
    private themeService: ThemeserviceService,
    private subCategoryService: SubcategoryService,
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.showSpinner = false;
    }, 3000);
    this.list('Categorias');
  }
  list(type: string): void {
    console.log('type', type);
    switch (type) {
      case 'Categorias':
        this.loadCategories();
        break;
      case 'Sub Categoria':
        this.loadSubCategories();
        break;
      case 'Temas':
        this.loadThemes();
        break;
    }
  }

  loadSubCategories(): void {
    this.subCategoryService.getAll().subscribe({
      next: (data: ISubCategoryDto[]) => {
        this.dataSource.data = data;
        this.setColumns([
          {
            columnDef: 'name',
            header: 'Nombre',
            cell: (row: ISubCategoryDto) => row.name,
          },
          {
            columnDef: 'active',
            header: 'Activo',
            cell: (row: ISubCategoryDto) => (row.active ? 'Sí' : 'No'),
          },
          {
            columnDef: 'dateCreation',
            header: 'Fecha de creación',
            cell: (row: ISubCategoryDto) =>
              row.dateCreation.toLocaleDateString(),
          },
          {
            columnDef: 'theme',
            header: 'Temas',
            cell: (row: ISubCategoryDto) => row.theme.join(', '),
          },
        ]);
      },
      error: (error) => console.error(error),
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data: any) => {
        console.log('component', data.results[0].dateCreation);
        this.dataSource.data = data.results;
        this.setColumns([
          {
            columnDef: 'name',
            header: 'Nombre',
            cell: (row: ICategoryDto) => row.name,
          },
          {
            columnDef: 'active',
            header: 'Activo',
            cell: (row: ICategoryDto) => (row.active ? 'Sí' : 'No'),
          },
          {
            columnDef: 'dateCreation',
            header: 'Fecha de creación',
            cell: (row: ICategoryDto) => {
              const date = new Date(row.dateCreation);
              return date.toISOString().split('T')[0];
            },
          },
          {
            columnDef: 'subcategory',
            header: 'Subcategorías',
            cell: (row: ICategoryDto) => {
              // Verifica si hay subcategorías
              if (row.subcategory && row.subcategory.length > 0) {
                return row.subcategory.join(', '); // Une las
              } else {
                return 'No hay subcategorías';
              }
            },
          },
        ]);
      },
      error: (error) => console.error(error),
    });
  }

  loadThemes(): void {
    this.themeService.getAll().subscribe({
      next: (data: IthemeDto[]) => {
        this.dataSource.data = data;
        this.setColumns([
          {
            columnDef: 'name',
            header: 'Nombre',
            cell: (row: IthemeDto) => row.name,
          },
          {
            columnDef: 'active',
            header: 'Activo',
            cell: (row: IthemeDto) => (row.active ? 'Sí' : 'No'),
          },
          {
            columnDef: 'dateCreation',
            header: 'Fecha de creación',
            cell: (row: IthemeDto) => row.dateCreation.toLocaleDateString(),
          },
        ]);
      },
      error: (error: any) => console.error(error),
    });
  }

  setColumns(columns: any[]): void {
    this.columns = columns;
    this.displayedColumns = columns
      .map((col) => col.columnDef)
      .concat('Acciones');
  }

  openAddThemeDialog() {
    const dialogRef = this.dialog.open(ThemesComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.themeService.addTheme(result).subscribe({
          next: (resp) => {
            console.log('Tema agregado', resp);
            // Actualiza la tabla o realiza otras acciones necesarias
          },
          error: (error) => {
            console.error('Error al agregar tema', error);
          },
        });
      }
    });
  }

  addTheme(body: any) {
    try {
      this.themeService.addTheme(body).subscribe({
        next: (dta: any) => {
          console.log('data', dta);
        },
        error: (error: Error) => {
          console.log('error', error);
        },
      });
    } catch (error) {
      throw new Error();
    }
  }

  onEdit(id: any) {}

  onDelete(id: any) {}
}
