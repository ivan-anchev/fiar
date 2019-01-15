import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class ErrorHandlerService {

  constructor(private _snackBar: MatSnackBar) { }

  displayError(errMessage: string) {
    this._snackBar.open(errMessage, null, { duration: 5000});
  }
}
