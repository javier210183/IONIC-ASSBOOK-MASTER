import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Observable, catchError, from, map, of, switchMap, throwError } from 'rxjs';
import { User, UserLogin } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #logged = signal(false);

  #http = inject(HttpClient)

  get logged() {
    return this.#logged.asReadonly();
  }

  login(
    email: string,
    password: string,
    firebaseToken?: string // For push notifications
  ): Observable<void> {
    return this.#http
      .post<{ accessToken: string }>('auth/login', {
        email,
        password,
        firebaseToken,
      })
      .pipe(
        // SwitchMap allows to return a value inside an Observable or a Promise (this case -> async)
        switchMap(async (r) => {
          try {
            await Preferences.set({ key: 'fs-token', value: r.accessToken });
            this.#logged.set(true);
          } catch (e) {
            throw new Error('Can\'t save authentication token in storage!');
          }
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


  getProfile(): Observable<User> {
    return this.#http
      .get<{ user: User }>('users/me')
      .pipe(map((r) => r.user));
  }
}