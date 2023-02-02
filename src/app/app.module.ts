import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ApiService } from "./services/api.service";
import { LoginComponent } from "./views/users/login/login.component";
import { ProfileComponent } from "./views/users/profile/profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { RegistrationComponent } from "./views/users/registration/registration.component";
import { MovieCardComponent } from "./views/movies/movie-card/movie-card.component";
import { WelcomePageComponent } from "./views/welcome-page/welcome-page.component";
import { AppMaterialModule } from "./app-material.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegistrationComponent,
    MovieCardComponent,
    WelcomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
