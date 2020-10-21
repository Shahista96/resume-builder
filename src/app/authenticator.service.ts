import { Injectable, NgZone, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './classes/User';
declare var gapi : any;
// import { gapi } from './'



@Injectable()
export class AuthenticatorService {
  
    public auth2: any;
    public user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private zone: NgZone, private http: HttpClient) { }

    validateToken(token: string): Observable<User> {
        return this.http.get<User>(`http://localhost:4200/validationApi/${token}`);
    }


    ngAfterViewInit() {
      // this.zone.run(() => {
      //     // example to render login button
      //     gapi.load('auth2', () => {
      //       gapi.auth2.init({
      //           client_id: '1072862085531-algbnliig70b6fufe99l1b7gu5lfjrif.apps.googleusercontent.com',
      //           fetch_basic_profile: true
      //       }).then((auth) => {
      //           this.zone.run(() => {
      //               this.auth2 = auth;
      //               this.isLoaded$.next(true);
      //           });
      //       },
      //       );
      //   });
  
      // });
    }    
  

    signIn(): void {
        this.auth2.signIn().then(user => {
            this.validateToken(user.getAuthResponse().id_token).subscribe(user => {
                this.zone.run(() => {
                    this.user$.next(user);
                    this.isLoggedIn$.next(true);
                });
            },
                (err) => {
                    console.error(err);
                });
        });
    };

    signOut(): void {
        this.auth2.signOut().then(() => {
            this.zone.run(() => {
                this.isLoggedIn$.next(false);
                this.user$.next(null);
            });
        },
            (err) => {
                console.error(err);
            });
    }

    loadAuth2(): void {
      alert('loadAuth2')
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: '1072862085531-algbnliig70b6fufe99l1b7gu5lfjrif.apps.googleusercontent.com',
                fetch_basic_profile: true
            }).then((auth) => {
                this.zone.run(() => {
                  alert('Promise resolved')
                    console.log('Auth2 :: ',this.auth2)
                    this.auth2 = auth;
                    this.isLoaded$.next(true);
                });
            },
            );
        });
    }
}