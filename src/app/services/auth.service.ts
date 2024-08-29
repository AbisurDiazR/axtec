import { Injectable, isDevMode } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';
import { User } from '../utils/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Email } from '../utils/email';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Subject<any> = new Subject();

  constructor(
    private afAuth: AngularFireAuth,
    private _db: AngularFirestore,
    private http: HttpClient
  ) {
  }

  get observerCurrentUser() {
    return this.afAuth.authState;
  }

  async loginWithEmail(user: User) {
    try {
      const login = this.afAuth.signInWithEmailAndPassword(user.email, user.password);
      return login;
    } catch (err) {
      return err;
    }
  }

  setTokenWithEmail(user: User): Promise<any> {
    let url: String = '';
    isDevMode() ? url = 'api/users/login' : `${environment.api_url}api/users/login`;
    let userData = {
      "email": user.email,
      "password": user.password
    };
    return this.http.post<any>(`${url}`, userData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    ).toPromise();
  }

  async registerWithEmail(userData: User): Promise<any> {
    let url: String = '';
    isDevMode() ? url = 'api/users' : `${environment.api_url}api/users`;
    return this.http.post<any>(`${url}`, userData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    ).toPromise();
  }

  sendEmailVerification(emailData: Email): Promise<any> {
    let url: String = '';
    isDevMode() ? url = 'api/email' : `${environment.api_url}api/email`;
    return this.http.post<any>(`${url}`, emailData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    ).toPromise();
  }

  getUserByEmail(email: any): Observable<any> {
    return this._db.collection('users', ref => ref.where('email', '==', email)).get().pipe(
      map((users: any) => {
        const user = users.docs.map((value: any) => {
          const data = value.data();
          const id = value.id;
          return { id: id, ...data };
        });
        return user;
      })
    );
  }

  async logout() {
    try {
      localStorage.clear();
      await this.afAuth.signOut();
      this.user$.next(null);
    } catch (error) {

    }
  }

  public updateUserProfilePhoto(newPhotoURL: string): Promise<void> {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        return user.updateProfile({
          photoURL: newPhotoURL
        }).then(() => {
          console.log('PhotoURL updated successfully');
        }).catch(error => {
          console.error('Error updating photoURL:', error);
        });
      } else {
        throw new Error('No user is currently logged in.');
      }
    });
  }

  public updateUserData(userData: any): Promise<void> {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        // Actualiza el perfil del usuario en Firebase Authentication
        return user.updateProfile({
          displayName: userData.displayName// Firebase Auth no soporta phoneNumber en updateProfile
        }).then(() => {
          console.log('User profile updated successfully');
        }).catch(error => {
          console.error('Error updating user profile:', error);
        });
      } else {
        throw new Error('No user is currently logged in.');
      }
    });
  }

  public updateUserCollection(userData: any, uid: string) {
    // Actualiza el documento en la colección 'users'
    return this._db.collection('users').doc(uid).set(userData).then(() => {
      console.log('Firestore document updated successfully');
    }).catch(error => {
      console.error('Error updating Firestore document:', error);
    });
  }
}
