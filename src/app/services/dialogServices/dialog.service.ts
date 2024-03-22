import { Injectable } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ThankyouDialogComponent} from '../../thankyou-dialog/thankyou-dialog.component';
import {GeneralErrorDialogComponent} from '../../general-error-dialog/general-error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openThankYouDialog(): void {
    this.dialog.open(ThankyouDialogComponent, {
    });
  }

  openGeneralErrorDialog(errorMsg: string): void{
    this.dialog.open(GeneralErrorDialogComponent, {
      data: { errorMsg }
    });
  }


}
