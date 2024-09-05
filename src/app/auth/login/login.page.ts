import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, NavController, IonRouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';
import { iLogin, TokenLogin } from '../interfaces/user';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleLoginDirective } from 'src/app/google-login/google-login.directive';
import { LoadGoogleApiService } from 'src/app/google-login/load-google-api.service';
import { FbLoginDirective } from 'src/facebook-login/fb-login.directive';
import { Subscription } from 'rxjs';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [FormsModule, RouterLink, IonRouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonGrid, IonRow, IonCol, IonButton, IonIcon, GoogleLoginDirective, FbLoginDirective]
})
export class LoginPage implements OnInit, OnDestroy {
  email = '';
  password = '';

  #authService = inject(AuthService);
  #alertCtrl = inject(AlertController);
  #navCtrl = inject(NavController);
  #loadGoogle = inject(LoadGoogleApiService);
  credentialsSub!: Subscription;

  iconFacebook = faFacebook;

  async ngOnInit() {
    this.credentialsSub = this.#loadGoogle.credential$.subscribe(
      resp => {
        //console.log(resp.credential); // Envio al backend
        this.#authService.loginGoogle({ token: resp.credential }).subscribe({
          next: () => {
            this.#navCtrl.navigateRoot(['/post']);
          },
          error: async (error) => {
            const message = error.error?.message || 'Error desconocido al intentar iniciar sesión con Google.';
            const alert = await this.#alertCtrl.create({
              header: 'Google Login Error',
              message: message,
              buttons: ['Ok'],
            });
            await alert.present();
          }
        });
      }
    );
  }

  loggedFacebook(resp: fb.StatusResponse) {
    // Verificar que el token no sea undefined
    const token = resp.authResponse.accessToken ?? '';
    if (token) {
      // Enviar al servidor
      //console.log(token);
      this.#authService.loginFacebook({ token } as TokenLogin).subscribe({
        next: () => {
          this.#navCtrl.navigateRoot(['/post']);
        },
        error: async (error) => {
          const message = error.error?.message || 'Error desconocido al intentar iniciar sesión con Facebook.';
          const alert = await this.#alertCtrl.create({
            header: 'Facebook Login Error',
            message: message,
            buttons: ['Ok'],
          });
          await alert.present();
        }
      });
    } else {
      this.showError('Token de Facebook no disponible');
    }
  }

  showError(error: any) {
   // console.error(error);
  }

  ngOnDestroy(): void {
    this.credentialsSub.unsubscribe();
  }

  async login() {
    try {
      const position = await Geolocation.getCurrentPosition();
      if (position && position.coords) {
        const loginData: iLogin = {
          email: this.email,
          password: this.password,
          latitud: position.coords.latitude,
          longitud: position.coords.longitude,
        };

       // console.log("Intentando iniciar sesión con:", loginData);

        this.#authService.login(loginData).subscribe({
          next: () => {
            this.#navCtrl.navigateRoot(['/post']);
          },
          error: async (error) => {
            const message = error.error?.message || 'Error desconocido al intentar iniciar sesión.';
            const alert = await this.#alertCtrl.create({
              header: 'Login error',
              message: message,
              buttons: ['Ok'],
            });
            await alert.present();
          }
        });
      } else {
        throw new Error('Unable to get current location coordinates.');
      }
    } catch (error) {
      //console.error('Error getting location', error);
      const alert = await this.#alertCtrl.create({
        header: 'Location error',
        message: 'Unable to get current location.',
        buttons: ['Ok'],
      });
      await alert.present();
    }
  }
}
