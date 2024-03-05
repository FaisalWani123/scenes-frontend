import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BackendServiceService} from '../services/backend-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router, private backendService: BackendServiceService) { }

  ngOnInit(): void {

    // this.backendService.getData().subscribe(
    //   (data) => {
    //     console.log('Response:', data);
    //     // Handle the text response here
    //   },
    //   (error) => {
    //     console.error('Error:', error);
    //   }
    // );

  }

  // tslint:disable-next-line:typedef
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  // tslint:disable-next-line:typedef
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
