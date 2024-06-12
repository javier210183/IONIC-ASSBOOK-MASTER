import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // Importar la configuración

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig);
