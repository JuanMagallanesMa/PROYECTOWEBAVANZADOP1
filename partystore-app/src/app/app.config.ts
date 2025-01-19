import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(),
<<<<<<< HEAD
    provideHttpClient(), provideAnimationsAsync()
=======
    provideHttpClient(), provideAnimationsAsync(),CartService, provideAnimationsAsync()
>>>>>>> 51da6a3b50a31dc147e59a98a0f23064ea430ef6
  ]
};
