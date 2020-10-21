import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from 'src/app/authenticator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 test = true;
 imageSrc1 = '.././assets/images/Background1.jpg';
 
//   constructor() { }
 
//   ngOnInit() {
//     while(true){
//       setTimeout(function(){
//       this.test = !this.test;
//       }, 5000);
//     }
    
//   }

// login(){
//   gapi.load('auth2', function(){
//     gapi.auth2.init();
//   })
// } 

public authIsLoaded: boolean = false;
public isLoggedIn: boolean = false;
public user;

constructor(private authenticatorService: AuthenticatorService) { }

    signIn(): void {
    this.authenticatorService.signIn();
    };

    signOut(): void {
    this.authenticatorService.signOut();
    }

    ngOnInit() {
    this.authenticatorService.isLoaded$.subscribe( value => {
        this.authIsLoaded = value;
    });

    this.authenticatorService.isLoggedIn$.subscribe( value => {
        this.isLoggedIn = value;
    });

    this.authenticatorService.user$.subscribe( value => {
        this.user = value;
    });

    this.authenticatorService.loadAuth2();
    }
 
}
