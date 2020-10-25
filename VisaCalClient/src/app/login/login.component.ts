import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;
  isSubmitted = false;

  showServerErrorMessage = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }



  ngOnInit(): void {
    this.authForm  =  this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
  });
  }

  get formControls() { return this.authForm.controls; }

  signIn(){
    this.isSubmitted = true;
    if(this.authForm.invalid){
      return;
    }
    this.authService.login(this.authForm.value)
      .subscribe(
        (resp) => {
          if (resp.userName != '') {
            localStorage.setItem('ACCESS_TOKEN', resp.token);
            this.router.navigateByUrl('/animals');
          }
        },
          (err) => {
            this.showServerErrorMessage = true;
          });
  }

}
