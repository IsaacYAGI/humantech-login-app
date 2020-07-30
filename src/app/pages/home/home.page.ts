import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  email: string = "";
  constructor(
    public auth: AuthenticationService,
    private router: Router
  ) {
    auth.userDetails().subscribe(val => this.email = val?.email);
   }

  ngOnInit() {
  }

  async logout(){
    try {
      await this.auth.logoutUser();
      this.router.navigateByUrl("/tabs/login");
    } catch (error) {
      console.error(error);
    }
  }
}
