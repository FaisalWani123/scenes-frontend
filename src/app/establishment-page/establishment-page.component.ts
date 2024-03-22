import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenServiceService} from '../services/tokenServices/token-service.service';
import {BackendServiceService} from '../services/generalBackendServices/backend-service.service';
import {any} from 'codelyzer/util/function';
import {Establishment} from '../Entities/establishment/establishment';
import {Observable} from 'rxjs';
import {DialogService} from '../services/dialogServices/dialog.service';
import {Friend} from '../Entities/friend/friend';
import {FriendBackendServiceService} from '../services/friendServices/friend-backend-service.service';
import {User} from '../Entities/user/user';
import {map} from 'rxjs/operators';
import {FriendListResponse} from '../Entities/friend/friendListResponse/friend-list-response';
import {FriendList} from '../Entities/friend/friendList/friend-list';
import {Package} from '../Entities/package/package';
import {PackageServicesService} from '../services/packageServices/package-services.service';
import {FindAllPackagesResponse} from '../Entities/package/packageResponse/find-all-packages-response';

@Component({
  selector: 'app-establishment-page',
  templateUrl: './establishment-page.component.html',
  styleUrls: ['./establishment-page.component.css']
})
export class EstablishmentPageComponent implements OnInit {


  constructor(private tokenService: TokenServiceService,
              private router: Router,
              private backend: BackendServiceService,
              private friendBackend: FriendBackendServiceService,
              private packageBackend: PackageServicesService,
              private dialog: DialogService) { }

  token = this.tokenService.getToken();
  email = this.tokenService.getEmail();
  user: User | undefined;
  establishmentId!: number;
  establishment: Establishment | undefined;
  friendList: FriendList[] = [];
  packageList: Package[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  findUserDetailsByEmail(email?: string): void {
    this.backend.findUserByEmail(this.email).subscribe(
      (userDetails: User) => {
        this.user = userDetails;
        this.getFriendList();
      },
      (error) => {
        this.dialog.openGeneralErrorDialog(error);
      }
    );
  }

  getFriendList(): void {
    this.friendBackend.getFriendList(this.user?.id).subscribe(
      (friends: FriendList[]) => {
        this.friendList = friends;
      },
      (error) => {
        this.dialog.openGeneralErrorDialog(error);
      }
    );
  }

  loadData(): void{
    this.findUserDetailsByEmail(this.email);
    // @ts-ignore
    this.establishmentId = parseInt(localStorage.getItem('establishmentid'), 10);
    this.getEstablishment();
  }

  // @ts-ignore
  getEstablishment(): Observable<Establishment> {
    this.backend.getEstablishment(this.establishmentId).subscribe(
      (result: Establishment) => {
        this.establishment = result;
        this.getAllPackages();
      },
      (error: any) => {
        this.dialog.openGeneralErrorDialog(error);
      }
    );
  }
  backtoDash(): void {
    this.router.navigate(['/main-page']);
  }

  getAllPackages(): void{
    this.packageBackend.getPackagesForEstablishment(this.establishmentId).subscribe(
      (response: FindAllPackagesResponse) => {
        if (response && response.packageList) {
          this.packageList = response.packageList;
        } else {
          this.dialog.openGeneralErrorDialog('no package data found');
        }
      },
      (error) => {
        this.dialog.openGeneralErrorDialog(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  addPackageToScene(myPackage: Package) {
    console.log(myPackage.packageId, myPackage.amount);
  }
}
