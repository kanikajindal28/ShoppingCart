import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {RegistrationService} from "../registration.service";
import {ProductListService} from "../product-list.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  private role;
  private user;
  private result;
  private searchedItem:string;
  @Output() private childEvent = new EventEmitter();

  constructor(private loginService: AuthenticationService, private regService: RegistrationService ,private prodService:ProductListService) {
  }

  ngOnInit() {
    this.regService.getUser().subscribe(data => {
      this.user = data;
      this.role = this.user.role;
    });

  }

  searchOnclick() {
    if(this.searchedItem != undefined && this.searchedItem !='')
    {
      this.prodService.getSearchedResult(this.searchedItem).subscribe( data=>
      {
        this.result=data;
        this.childEvent.emit(this.result);
      });
    }
  }
}
