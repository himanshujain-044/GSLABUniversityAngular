import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
const allMaterialModules = [
  MatInputModule,
  MatSortModule,
  MatIconModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatButtonModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatSelectModule,
  MatRadioModule,
  MatTabsModule,
  MatTableModule,
  MatMenuModule,
];
@NgModule({
  imports: [allMaterialModules],
  exports: [allMaterialModules],
})
export class MaterialModule {}
