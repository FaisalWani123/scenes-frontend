import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      }
    );
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    if (this.myForm.valid){
      console.log(this.myForm.value);
    }else{
      console.log('incorrect credentials');
    }

  }

  // tslint:disable-next-line:typedef
  backToLanding() {
    this.router.navigate(['/landing-page']);
  }

  // tslint:disable-next-line:typedef
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
