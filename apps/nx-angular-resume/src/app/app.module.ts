import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import {
  Environment,
  FirebaseEnvironment
} from '@nx-angular-resume/common-classes';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    {
      provide: Environment,
      useValue: environment
    },
    {
      provide: FirebaseEnvironment,
      useValue: environment.firebase
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
