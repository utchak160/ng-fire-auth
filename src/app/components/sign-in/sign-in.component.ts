import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {icon} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  faCoffee = faCoffee
  faFacebook = icon("facebook");
  faGoogle = icon("github");
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
