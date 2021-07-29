import { Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Injectable({ providedIn: 'root' })
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    // console.log(form?.value.duration.trim().length);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
