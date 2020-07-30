import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ValidationsService } from 'src/app/services/validations.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private validators: ValidationsService
  ) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm(){
    this.form = this.formBuilder.group({
      //valor por defecto // sync validator // async validator
      // fullName:['', [Validators.required, Validators.minLength(5)]],
      email:['test@test.com', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password1:['123456', [Validators.required, Validators.minLength(6)]],
      password2:['123456', [Validators.required, Validators.minLength(6)]],
      
    },
    {
      validators: [this.validators.samePasswords('password1','password2')]
    });
  }

  async saveForm(){
    // console.log(this.form);
    if (this.form.valid){
      try {
        const body = {
          email: this.form.value.email,
          password: this.form.value.password1
        }
        const result = await this.authService.registerUser(body);
        // console.log(result);
        this.router.navigateByUrl("/home");
      } catch (error) {
        // console.error(error);
      } finally{

      }

      
      
    }
    return;
  }

}
