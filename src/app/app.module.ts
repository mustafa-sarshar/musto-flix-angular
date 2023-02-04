import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { DialogModule } from "@angular/cdk/dialog";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./views/users/login/login.component";
import { ProfileComponent } from "./views/users/profile/profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ApiService } from "./services/api.service";

import { RegistrationComponent } from "./views/users/registration/registration.component";
import { MovieCardComponent } from "./views/movies/movie-card/movie-card.component";
import { WelcomePageComponent } from "./views/welcome-page/welcome-page.component";
import { AppMaterialModule } from "./app-material.module";
import { NavbarComponent } from "./views/navbar/navbar.component";
import { GenreComponent } from "./views/movies/genre/genre.component";
import { DirectorComponent } from "./views/movies/director/director.component";
import { StarComponent } from "./views/movies/star/star.component";
import { StarsComponent } from "./views/movies/stars/stars.component";
import { DirectorsComponent } from "./views/movies/directors/directors.component";
import { GenresComponent } from "./views/movies/genres/genres.component";
import { DialogConfirmationComponent } from "./views/dialog-confirmation/dialog-confirmation.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegistrationComponent,
    MovieCardComponent,
    WelcomePageComponent,
    NavbarComponent,
    GenreComponent,
    DirectorComponent,
    StarComponent,
    StarsComponent,
    DirectorsComponent,
    GenresComponent,
    DialogConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    DialogModule,
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
