import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-thankyou-dialog',
  templateUrl: './thankyou-dialog.component.html',
  styleUrls: ['./thankyou-dialog.component.css']
})


export class ThankyouDialogComponent implements OnInit {

  constructor(private router: Router, private dialogref: MatDialogRef<ThankyouDialogComponent>) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  navigateToLogin() {
    this.dialogref.close();
    this.router.navigate(['/login']);
  }
}
