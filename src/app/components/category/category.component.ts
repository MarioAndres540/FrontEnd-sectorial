import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaDialogComponent } from './crearCategory/categoria-dialog/categoria-dialog.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  categoris: any[] = [];

  constructor(private dialog: MatDialog) {
    console.log('entre');
  }

  ngOnInit() {
    console.log('entre');
  }

  addCategory() {
    const dialogRef = this.dialog.open(CategoriaDialogComponent, {
      data: { nombre: '', activo: '', subCategoria: '' },
    });

    dialogRef.afterClosed().subscribe();
  }

  editCategory(body: any) {}

  deleteCategory(id: string) {}

  inactivarCategoria(id: string) {}
}
