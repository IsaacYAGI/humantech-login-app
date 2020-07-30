import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  email: string = "";
  constructor(
    public auth: AuthenticationService
  ) {
    auth.userDetails().subscribe(val => this.email = val.email);
   }

  ngOnInit() {
  }
}
