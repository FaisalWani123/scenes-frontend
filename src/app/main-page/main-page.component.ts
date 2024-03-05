import { Component, OnInit } from '@angular/core';
import {TokenServiceService} from '../services/token-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private tokenService: TokenServiceService) { }

  token = this.tokenService.getToken();
  firstName = this.tokenService.getFirstName();
  lastName = this.tokenService.getLastName();

  ngOnInit(): void {
  }

}
