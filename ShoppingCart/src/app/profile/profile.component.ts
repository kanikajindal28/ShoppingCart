import { Component, OnInit } from '@angular/core';
import {RegistrationService} from "../registration.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private rService : RegistrationService) { }
  private user;
  ngOnInit()
  {
    this.rService.getUser().subscribe(data => {
      this.user=data;
  });

  }

  editDetails() {
    this.rService.editUser(this.user).subscribe((data) =>
    {
      alert("User Updated Successfully!!");
    });
  }
}
