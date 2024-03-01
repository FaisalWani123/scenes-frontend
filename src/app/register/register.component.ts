import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

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
  onSubmit() {
    // @ts-ignore
    if (this.myForm.valid){
      console.log(this.myForm.value);
    }else{
      console.log('please check your details');
    }

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
