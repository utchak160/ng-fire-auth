import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {Constants} from "../../utils/Constants";
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  faUser = faUser;
  faSignOut = faSignOutAlt
  user: User;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem(Constants.USER_DETAILS));
  }

}
