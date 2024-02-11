import { Component } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';

declare let $: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private globals: Globals, private router: Router,) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.globals.companyCode = "1";
    this.globals.userDetail = { userFullName: 'suraj' };
  }

  onProfileIconClick(profileNotificationDiv) {
    $(profileNotificationDiv).slideToggle(400);
  }

  onSidePanelExpandCollapse(sidePanel) {
    $(sidePanel).slideToggle(1);
  }

  onLogout() {
    this.router.navigate(['/']);
  }
}
