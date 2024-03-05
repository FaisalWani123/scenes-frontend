import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BackendServiceService} from '../services/backend-service.service';
import {User} from '../Entities/user';
import {DialogService} from '../services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import {ThankyouDialogComponent} from '../thankyou-dialog/thankyou-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm!: FormGroup;

  user: User = new User();
  constructor(private formBuilder: FormBuilder,
              private router: Router, private backendService: BackendServiceService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordMinLength(6)]],
      confirmPassword: ['', Validators.required],
      DOB: ['', [Validators.required, this.minimumAgeValidator(18)]],
    }, { validator: this.passwordMatchValidator }
    );
  }

  // tslint:disable-next-line:typedef
  passwordMinLength(minLength: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.get('password');
      if (password?.value.length() < minLength){
        return {passwordTooShort: true};
      }
      return null; // Validation Passed
    };
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    // Check if password and confirm password match
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // tslint:disable-next-line:typedef
  minimumAgeValidator(minAge: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const today = new Date();
      const birthDate = new Date(control.value);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < minAge) {
        return { minAge: { requiredAge: minAge, actualAge: age } };
      }
      return null; // Validation passed
    };
  }

  // tslint:disable-next-line:typedef
  buildUser(){
    this.user.firstName = this.myForm.get('firstName')?.value;
    this.user.lastName = this.myForm.get('lastName')?.value;
    this.user.email = this.myForm.get('email')?.value;
    this.user.dob = this.myForm.get('DOB')?.value;
    this.user.password = this.myForm.get('password')?.value;
    return this.user;
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    // @ts-ignore
    if (this.myForm.valid){
      this.user = this.buildUser();
      this.doesUserExist();

      // console.log(this.user);
    }else{
      console.log('please check your details');
    }

  }

  doesUserExist(): void{
    this.backendService.doesUserExist(this.user.email).subscribe(
      (response) => {
        // Handle the response here
        if (response === null){
          this.registerUser();
        }
      },
      (error) => {
        // Handle errors here
        const statusCode = error.status;
        if (statusCode === 400){
          this.dialogService.openGeneralErrorDialog('Email already exists');
        }

      }
    );
  }

  registerUser(): void{
    this.backendService.registerUser(this.user).subscribe(
      (response: any) => {
        // Success callback
        const token = response.token;
        if (token != null){
          this.dialogService.openThankYouDialog();
        }
      },
      (error) => {
        // Error callback
        console.error('Error:', error);
        // Handle error scenarios
      }
    );
  }

  // tslint:disable-next-line:typedef
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // tslint:disable-next-line:typedef
  backToLanding() {
    this.router.navigate(['/landing-page']);
  }
}
