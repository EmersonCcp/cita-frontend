import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment.development';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // AngularFireStorageModule.(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireAuthModule, // Módulo para autenticación
    AngularFireDatabaseModule, // Módulo para base de datos
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
