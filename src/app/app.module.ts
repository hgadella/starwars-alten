import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShipsListComponent } from './components/ships-list/ships-list.component';
import { ShipDisplayComponent } from './components/ship-display/ship-display.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { BaseSettings } from './config/app.settings';
import { RequestService } from './services/request/request.service';
import { AuthenticationService } from './services/authentication.service';
import { FormBuilder } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ShipsListComponent,
    ShipDisplayComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, BaseSettings, RequestService, AuthenticationService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
