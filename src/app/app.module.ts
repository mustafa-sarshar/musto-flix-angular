import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DialogModule } from "@angular/cdk/dialog";
import { LayoutModule } from "@angular/cdk/layout";

import { AppRoutingModule } from "./app-routing.module";
import { AppMaterialModule } from "./app-material.module";
import { AppComponent } from "./app.component";

import { UsersService } from "./shared/services/users.service";
import { MoviesService } from "./shared/services/movies.service";
import { AuthService } from "./shared/services/auth.service";

import { AuthGuard } from "./shared/guards/auth.guard";
import { LeaveEditingGuard } from "./shared/guards/leave-editing.guard";

import { LoginComponent } from "./views/users/login/login.component";
import { ProfileComponent } from "./views/users/profile/profile.component";
import { RegistrationComponent } from "./views/users/registration/registration.component";
import { MovieCardComponent } from "./views/movies/movie-card/movie-card.component";
import { WelcomePageComponent } from "./views/welcome-page/welcome-page.component";
import { StarsComponent } from "./views/movies/stars/stars.component";
import { DirectorsComponent } from "./views/movies/directors/directors.component";
import { GenresComponent } from "./views/movies/genres/genres.component";
import { MainNavComponent } from "./views/main-nav/main-nav.component";
import { PageFooterComponent } from "./views/page-footer/page-footer.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegistrationComponent,
    MovieCardComponent,
    WelcomePageComponent,
    StarsComponent,
    DirectorsComponent,
    GenresComponent,
    MainNavComponent,
    PageFooterComponent,
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
    LayoutModule,
  ],
  providers: [
    UsersService,
    MoviesService,
    AuthService,
    AuthGuard,
    LeaveEditingGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
