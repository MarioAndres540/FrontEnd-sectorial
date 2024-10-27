import { Component, Inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-categoria-dialog',
  standalone: true,
  imports: [MatInputModule, FormsModule],
  templateUrl: './categoria-dialog.component.html',
  styleUrl: './categoria-dialog.component.scss',
})
export class CategoriaDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CategoriaDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id?: string;
      nombre: string;
      activo: boolean;
      subCategory: string;
    }
  ) {}

  onNoClick(): void {
    this.dialogRef.close;
  }
}
