import {Component, OnInit, ViewChild} from '@angular/core';
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
import {Scenebuilder} from '../Entities/scene/sceneBuilder/scenebuilder';
import {SceneBill} from '../Entities/scene/sceneBuilder/sceneBill/scene-bill';
import {MatPaginator} from '@angular/material/paginator';

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
  sceneBuilder: Scenebuilder = new Scenebuilder();
  sceneBill: SceneBill = new SceneBill();
  guestList: FriendList[] = [];
  maxGuestListSize: number | undefined = 0;
  toggleval = true;
  // tslint:disable-next-line:typedef
  searchTerm: any;
  // tslint:disable-next-line:typedef
  filteredFriendList: FriendList[] = [];
  // tslint:disable-next-line:typedef
  pageSize = 10;
  currentPage = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void{
    this.findUserDetailsByEmail(this.email);
    // @ts-ignore
    this.establishmentId = parseInt(localStorage.getItem('establishmentid'), 10);
    this.getEstablishment();

  }

  mapToFriendList(user: User | undefined): FriendList{
    const friendList1 = new FriendList();
    friendList1.friendUserId = user?.id;
    friendList1.friendFirstName = user?.firstName;
    friendList1.friendLastName = user?.lastName;
    friendList1.friendEmail = user?.email;
    friendList1.requestAccepted = true;
    friendList1.male = user?.male;
    return friendList1;
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
        this.filteredFriendList = this.friendList;
      },
      (error) => {
        this.dialog.openGeneralErrorDialog(error);
      }
    );
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
    const maxSize = myPackage.maxCapacity;
    this.sceneBuilder.myPackage = myPackage;
    this.resetGuestList();
    this.guestList.push(this.mapToFriendList(this.user));
    if (myPackage.type === 'Couple Entry'){
      this.updateFriendListForCoupleEntry();
    } else{
      this.filteredFriendList = this.friendList;
    }
    this.updateBill();
  }

  updateFriendListForCoupleEntry(): void {
    this.filteredFriendList = this.friendList.filter(x => x.male === false);
  }


  resetGuestList(): void{
    for (const friend of this.guestList) {
      // Set the invited status to false for each friend
      friend.invited = false;
    }
    this.guestList = [];
    this.updateBill();
  }

  addFriendToGuestList(friend: FriendList): void{
    if (!this.isPackageSelected()){
      this.dialog.openGeneralErrorDialog('Please select a package first');
      return;
    }
    if (this.sceneBuilder.myPackage?.type === 'Couple Entry' && friend.male === true && this.user?.male === true){
      this.dialog.openGeneralErrorDialog('You need one male, one female for a couple entry');
      return;
    }
    const maxSize = this.sceneBuilder.myPackage?.maxCapacity;
    // @ts-ignore
    if (this.guestList.length + 1 > maxSize){
      this.dialog.openGeneralErrorDialog('exceeding max Capacity');
      return;
    }
    friend.invited = true;
    this.guestList.push(friend);
    // this.sceneBuilder.guestList = this.guestList;
    this.updateBill();
    // console.log('friend added: ' + this.guestList);

  }

  isPackageSelected(): boolean{
    if (this.sceneBuilder.myPackage == null){
      return false;
    }
    return true;
  }
  removeFriend(friend: FriendList): void {
    const index = this.guestList.indexOf(friend);
    if (index === 0){
      this.dialog.openGeneralErrorDialog('you cannot remove yourself');
      return;
    }
    if (index !== -1) {
      friend.invited = false;
      this.guestList.splice(index, 1); // Remove the friend from the guestList array
      this.updateBill();
    }
  }

  capitalizeFirstLetter(word: string | undefined): string {
    // @ts-ignore
    return word?.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  updateBill(): void{
    const amount = this.sceneBuilder.myPackage?.amount;
    const numberOfGuests = this.guestList.length;
    // @ts-ignore
    this.sceneBill.pricePerGuest = Math.floor(amount / numberOfGuests);
    this.sceneBill.totalAmount = this.sceneBuilder.myPackage?.amount;

    console.log(amount, numberOfGuests);
    return;
  }
  // tslint:disable-next-line:typedef
  filterFriendList() {
    if (!this.searchTerm || this.searchTerm == null || this.searchTerm === undefined){
      this.filteredFriendList = this.friendList;
    }
    else{
      this.filteredFriendList = this.friendList.filter(x => x.friendFirstName?.toLowerCase().includes(this.searchTerm.toLowerCase()
        || x.friendLastName?.toLowerCase().includes(this.searchTerm.toLowerCase())
        || x.friendEmail?.toLowerCase().includes(this.searchTerm.toLowerCase())));
    }
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
  }
}
