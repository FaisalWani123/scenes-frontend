// main-page.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenServiceService } from '../services/tokenServices/token-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { BackendServiceService } from '../services/generalBackendServices/backend-service.service';
import { Establishment } from '../Entities/establishment/establishment';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../Entities/user/user';
import {map} from 'rxjs/operators';
import {FriendList} from '../Entities/friend/friendList/friend-list';
import {FriendBackendServiceService} from '../services/friendServices/friend-backend-service.service';
import {GeneralErrorDialogComponent} from '../general-error-dialog/general-error-dialog.component';
import {DialogService} from '../services/dialogServices/dialog.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  constructor(private tokenService: TokenServiceService,
              private backendService: BackendServiceService,
              private router: Router,
              private friendBackend: FriendBackendServiceService,
              private dialog: DialogService) { }

  get pagedEstablishments(): Establishment[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.byRating(this.filteredEstablishments).slice(startIndex, startIndex + this.pageSize);
  }

  token = this.tokenService.getToken();
  email = this.tokenService.getEmail();
  establishments: Establishment[] = [];
  hotEstablishments: Establishment[] = [];
  filteredEstablishments: Establishment[] = [];
  searchTerm = '';
  pageSize = 6;
  currentPage = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedOption = 'name';
  user: User | undefined;

  allUserList: User[] = [];
  // tslint:disable-next-line:typedef
  selectedTab: string | undefined;
  friendSearchTerm: any;
  // tslint:disable-next-line:typedef
  filteredFriendList: FriendList[] = [];
  friendList: FriendList[] = [];
  // tslint:disable-next-line:typedef
  friendPageSize = 10;
  friendCurrentPage = 1;
  @ViewChild(MatPaginator) friendPaginator!: MatPaginator;

  ngOnInit(): void {
    this.loadData();
    this.findUserDetailsByEmail(this.email);

  }

  getFriendList(): void {
    this.friendBackend.getFriendList(this.user?.id).subscribe(
      (friends: FriendList[]) => {
        this.friendList = friends;
        this.filteredFriendList = this.friendList;
      },
      (error) => {
        this.dialog.openGeneralErrorDialog(error);
      }
    );
  }


  findUserDetailsByEmail(email?: string): void {
    this.backendService.findUserByEmail(this.email).subscribe(
      (userDetails: User) => {
        // You can also assign the userDetails to a class property if needed
        this.user = userDetails;
      },
      (error) => {
        console.error('Error occurred while fetching user details:', error);
      }
    );
  }


  loadData(): void {
    this.backendService.getAllEstablishments().subscribe((result) => {
      this.establishments = result;
      // this.hotEstablishments = this.hotTonight(this.establishments);
      this.filteredEstablishments = this.establishments;
      this.setupPaginator();
    });
  }

  byRating(establishmentList: Establishment[]): Establishment[]{
    // @ts-ignore
    return establishmentList.sort((a, b) => b.rating - a.rating);
  }

  setupPaginator(): void {
    if (this.paginator) {
      // Update the paginator's length property based on the filtered establishments
      this.paginator.length = this.filteredEstablishments.length;
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = this.pageSize;
    }
  }

  filterEstablishments(): void {
    if (!this.searchTerm) {
      this.filteredEstablishments = this.establishments;
    } else {
      if (this.selectedOption === 'cuisine') {
        this.filteredEstablishments = this.establishments
          .filter(est => est.cuisine?.toLowerCase().includes(this.searchTerm.toLowerCase()));
      } else if (this.selectedOption === 'name') {
        this.filteredEstablishments = this.establishments
          .filter(est => est.name?.toLowerCase().includes(this.searchTerm.toLowerCase()));
      } else if (this.selectedOption === 'area'){
        this.filteredEstablishments = this.establishments
          .filter(est => est.area?.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
    }
    this.setupPaginator(); // Update pagination after filtering
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
  }
  // tslint:disable-next-line:typedef
  buildScene(establishment: Establishment) {
    this.router.navigate(['/establishment-page']);
    // @ts-ignore
    localStorage.setItem('establishmentid', establishment.id);

  }
  // tslint:disable-next-line:typedef
  goToSceneBuilder() {
    this.router.navigate(['/establishment-page']);
  }

  // tslint:disable-next-line:typedef
  sendFriendRequest(friend: FriendList) {

  }

  // tslint:disable-next-line:typedef
  filterOtherFriendList() {
    if (!this.friendSearchTerm || this.friendSearchTerm == null || this.friendSearchTerm === undefined){
      this.filteredFriendList = this.friendList;
    }
    else{
      // @ts-ignore
      this.filteredFriendList = this.friendList.filter(x => x.friendFirstName?.toLowerCase().includes(this.friendSearchTerm.toLowerCase()
        || x.friendLastName?.toLowerCase().includes(this.friendSearchTerm.toLowerCase())
        || x.friendEmail?.toLowerCase().includes(this.friendSearchTerm.toLowerCase())));
    }
  }

  getAllUsers(): void {
    this.backendService.getAllUsers().subscribe(
      // @ts-ignore
      (users: User[]) => {
        this.allUserList = users; // Assign the received users to allUserList
      },
      (error) => {
        this.dialog.openGeneralErrorDialog('cant get users');
      }
    );
  }

}
