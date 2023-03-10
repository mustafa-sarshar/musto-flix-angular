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

import { FilterArrayPipe } from "./shared/pipes/filter-array.pipe";

import { LoginComponent } from "./views/users/login/login.component";
import { UserProfileComponent } from "./views/users/user-profile/user-profile.component";
import { RegistrationComponent } from "./views/users/registration/registration.component";
import { MovieCardComponent } from "./views/movies/movie-card/movie-card.component";
import { WelcomePageComponent } from "./views/welcome-page/welcome-page.component";
import { StarsComponent } from "./views/movies/stars/stars.component";
import { DirectorsComponent } from "./views/movies/directors/directors.component";
import { GenresComponent } from "./views/movies/genres/genres.component";
import { MainNavComponent } from "./shared/ui-gadgets/main-nav/main-nav.component";
import { PageFooterComponent } from "./shared/ui-gadgets/page-footer/page-footer.component";
import { ConfirmationDialogComponent } from "./shared/ui-gadgets/confirmation-dialog/confirmation-dialog.component";
import { LoadingSpinnerComponent } from "./shared/ui-gadgets/loading-spinner/loading-spinner.component";

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
    FilterArrayPipe,
    LoadingSpinnerComponent,
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
