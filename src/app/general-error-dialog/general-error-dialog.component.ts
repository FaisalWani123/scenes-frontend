import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-general-error-dialog',
  templateUrl: './general-error-dialog.component.html',
  styleUrls: ['./general-error-dialog.component.css']
})
export class GeneralErrorDialogComponent implements OnInit {
  errorMsg: string | undefined;

  constructor(private router: Router, private dialogRef: MatDialogRef<GeneralErrorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: { errorMsg: string }) { }

  ngOnInit(): void {
    this.errorMsg = this.data.errorMsg;
  }

  // tslint:disable-next-line:typedef
  continue() {
    this.dialogRef.close();

  }
}
