import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { DialogModule } from "@angular/cdk/dialog";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { LayoutModule } from "@angular/cdk/layout";

import { ApiService } from "./services/api.service";

import { LoginComponent } from "./views/users/login/login.component";
import { ProfileComponent } from "./views/users/profile/profile.component";
import { RegistrationComponent } from "./views/users/registration/registration.component";
import { MovieCardComponent } from "./views/movies/movie-card/movie-card.component";
import { WelcomePageComponent } from "./views/welcome-page/welcome-page.component";
import { AppMaterialModule } from "./app-material.module";
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
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
