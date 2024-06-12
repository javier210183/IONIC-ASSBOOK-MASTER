import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Observable, catchError, from, map, of, switchMap, throwError } from 'rxjs';
import { TokenLogin, User, UserLogin, iLogin } from '../interfaces/user';
import { TokenResponse, UserResponse } from '../interfaces/responses';
import { Geolocation } from '@capacitor/geolocation';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #logged = signal(false);

  #http = inject(HttpClient)

  get logged() {
    return this.#logged.asReadonly();
  }

  login(data: iLogin): Observable<void> {
    console.log("AQUI ESTA TU DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", data);
    return this.#http.post<TokenResponse>('auth/login', data).pipe(
      switchMap((r) => from(Preferences.set({ key: 'fs-token', value: r.accessToken })).pipe(
        map(() => {
          console.log("AQUI ESTA TU TOKEN BASURAAAAAAAAAAAAAAAA", r.accessToken);
          this.#logged.set(true);
        })
      ))
    );
  }
  loginGoogle(data: TokenLogin): Observable<void> {
    console.log("AQUI ESTA TU DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", data);
    return this.#http.post<TokenResponse>('auth/google', data).pipe(
      switchMap((r) => from(Preferences.set({ key: 'fs-token', value: r.accessToken })).pipe(
        map(() => {
          console.log("AQUI ESTA TU TOKEN BASURAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", r.accessToken);
          localStorage.setItem("token", r.accessToken);
          console.log("AQUI ESTA TU TOKEN BASURAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", localStorage.getItem("token"));
          this.#logged.set(true);
        })
      ))
    );
  }
  loginFacebook(data: TokenLogin): Observable<void> {
    console.log("AQUI ESTA TU DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", data);
    return this.#http.post<TokenResponse>('auth/facebook', data).pipe(
      map(r => {
        localStorage.setItem("token", r.accessToken);
        console.log("AQUI ESTA TU TOKEN BASURAAAAAAAAAAAAAAAA", localStorage.getItem("token"));
        this.#logged.set(true);
      })
    );
  }
  

  register(data: UserLogin): Observable<UserLogin> {
    console.log("Datos enviados al servidor:", data);
  
    return this.#http.post<UserLogin>('auth/register', data).pipe(
      map(response => {
        console.log("Registro exitoso", response);
        return response;
      }),
      catchError(error => {
        // En lugar de simplemente imprimir el error y retornar null, propagamos el error
        return throwError(() => error);
      })
    );
  }

  async logout(): Promise<void> {
    await Preferences.remove({ key: 'fs-token' });
    this.#logged.set(false);
  }

  isLogged(): Observable<boolean> {
    if (this.#logged()) { // User is logged
      return of(true);
    }
    // from transforms a Promise into an Observable
    return from(Preferences.get({ key: 'fs-token' })).pipe(
      switchMap((token) => {
        if (!token.value) { // No token
          return of(false);
        }

        return this.#http.get('auth/validate').pipe(
          map(() => {
            this.#logged.set(true);
            return true;
          }),
          catchError(() => of(false)) // Token not valid!
        );
      }),
      catchError(() => of(false)) // No value in Preferences
    );
  }
// Actualizar el avatar del usuario
updateAvatar(data: {  avatar: string}): Observable<any> {
  //const formData = new FormData();
  //formData.append('avatar', file);
  console.log("VOY A ENVIAR EL AVATA :", data);

  return this.#http.put('users/me/avatar', data);
}
    
updateProfile(data: { name: string; email: string }): Observable<UserLogin> {
  
  return this.#http.put<UserLogin>('users/me', data);
}

  getProfile(): Observable<User> {
    return this.#http
      .get<{ user: User }>('users/me')
      .pipe(map((r) => r.user));
  }
  changePassword(data: {  password: string }): Observable<any> {
    console.log("VOY A ENVIAR EL DATA :",data);
    return this.#http.put('users/me/password', data);
  }
  getUserProfile(userId: number): Observable<User> {
    console.log(`Fetching user profile for ID: ${userId}`);
    return this.#http.get<UserResponse>(`users/${userId}`).pipe(
      map(resp => {
        console.log('User profile response:', resp);
        return resp.user;
      }),
      catchError(error => {
        console.error('Error fetching user profile:', error);
        return throwError(() => error);
      })
    );
  }
}
  

