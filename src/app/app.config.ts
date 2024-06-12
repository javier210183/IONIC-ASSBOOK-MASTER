import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withPreloading, withRouterConfig } from '@angular/router';
import { PreloadAllModules, RouteReuseStrategy } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideIonicAngular, IonicRouteStrategy } from '@ionic/angular/standalone';
import { authTokenInterceptor } from './interceptors/auth-token.interceptor';
import { baseUrlInterceptor } from './interceptors/base-url.interceptor';
import { provideBingmapsKey } from 'src/app/src/app/bingmaps/bingmaps.config'; // Importar la configuración de Bing Maps
import { provideGoogleId } from './google-login/google-login.config'; // Ruta correcta
import { provideFacebookId } from 'src/facebook-login/facebook-login.config';

//import { provideFacebookId } from './auth/facebook-login/facebook-login.config';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
      withRouterConfig({ paramsInheritanceStrategy: 'always' })
    ),
    provideHttpClient(
      withInterceptors([baseUrlInterceptor, authTokenInterceptor])
    ),
    provideBingmapsKey('An8JNymYeoGzMUqXfVJlMm_9CLeMcpx_5NB0N1G9cUEUxIadv7XX5zVc008au1N1'), 
    provideGoogleId('746820501392-oalflicqch2kuc12s8rclb5rf7b1fist.apps.googleusercontent.com'),
    provideFacebookId('433124529051653', 'v18.0')
  ],
};
