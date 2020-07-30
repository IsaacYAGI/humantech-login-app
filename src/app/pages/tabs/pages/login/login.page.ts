import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private utils: UtilsService
  ) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm(){
    this.form = this.formBuilder.group({
      //valor por defecto // sync validator // async validator
      email:['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password:['', [Validators.required, Validators.minLength(6)]],
      
    },{
      // validators: [this.validadores.passwordsIguales('password1','password2')]
    });
  }

  async saveForm(){
    // console.log(this.form);
    if (this.form.valid){
      const loading = await this.utils.createLoading();
      try {
        await loading.present();
        const body = {
          email: this.form.value.email,
          password: this.form.value.password
        }
        const result = await this.authService.loginUser(body);
        // console.log(result);
        this.form.reset();
        this.router.navigateByUrl("/home");
      } catch (error) {
        //console.error(error);
        const alert = await this.utils.createAlert(error.message, "Error");
        await alert.present();
      } finally{
        loading.dismiss();
      }

      
      
    }
    return;
  }

}
