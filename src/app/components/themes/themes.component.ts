import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [
    MatDatepicker,
    MatDatepickerToggle,
    MatFormField,
    MatLabel,
    MatCheckbox,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss',
})
export class ThemesComponent {
  themeForm: FormGroup;
  picker: Date | undefined;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ThemesComponent>
  ) {
    this.themeForm = this.fb.group({
      name: ['', Validators.required],
      active: [true, Validators.required],
      dateCreation: [new Date(), Validators.required],
    });
  }

  onSubmit() {
    if (this.themeForm?.valid) {
      this.dialogRef.close(this.themeForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
