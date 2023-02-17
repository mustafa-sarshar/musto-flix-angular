import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
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
import { LeavePageGuard } from "./shared/guards/leave-page.guard";

import { LoginComponent } from "./views/users/login/login.component";
import { UserProfileComponent } from "./views/users/user-profile/user-profile.component";
import { RegistrationComponent } from "./views/users/registration/registration.component";
import { MovieCardComponent } from "./views/movies/movie-card/movie-card.component";
import { WelcomePageComponent } from "./views/welcome-page/welcome-page.component";
import { StarsComponent } from "./views/movies/stars/stars.component";
import { DirectorsComponent } from "./views/movies/directors/directors.component";
import { GenresComponent } from "./views/movies/genres/genres.component";
import { MainNavComponent } from "./views/ui/main-nav/main-nav.component";
import { PageFooterComponent } from "./views/ui/page-footer/page-footer.component";
import { ConfirmationDialogComponent } from "./views/confirmation-dialog/confirmation-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    MovieCardComponent,
    WelcomePageComponent,
    StarsComponent,
    DirectorsComponent,
    GenresComponent,
    MainNavComponent,
    PageFooterComponent,
    ConfirmationDialogComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    DialogModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule,
    LayoutModule,
  ],
  providers: [
    UsersService,
    MoviesService,
    AuthService,
    AuthGuard,
    LeavePageGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
