import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../Entities/user/user';
import {BackendServiceService} from '../services/generalBackendServices/backend-service.service';
import {DialogService} from '../services/dialogServices/dialog.service';
import {TokenServiceService} from '../services/tokenServices/token-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  user: User = new User();

  constructor(private router: Router, private formBuilder: FormBuilder, private backendService: BackendServiceService,
              private dialogService: DialogService, private tokenService: TokenServiceService) { }

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
      this.user = this.buildUser();
      this.backendService.login(this.user).subscribe(
        (response: any) => {
          // Success callback
          const token = response.token;
          const email = response.email;
          if (token != null){
            this.tokenService.setToken(token, email);
            this.router.navigate(['/main-page']);
          }
        },
        (error) => {
          // Error callback
          const errorStatus = error.status;
          if (errorStatus === 403){
            this.dialogService.openGeneralErrorDialog('Incorrect Credentials');
          }
        }
      );
      // console.log(this.user);
    }else{
      this.dialogService.openGeneralErrorDialog('Please input your Credentials');
    }

  }
  // tslint:disable-next-line:typedef
  buildUser(){
    this.user.email = this.myForm.get('email')?.value;
    this.user.password = this.myForm.get('password')?.value;
    return this.user;
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
