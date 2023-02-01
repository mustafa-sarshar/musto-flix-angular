import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WelcomePageComponent } from "./views/welcome-page/welcome-page.component";
import { MovieCardComponent } from "./views/movies/movie-card/movie-card.component";
import { ProfileComponent } from "./views/users/profile/profile.component";

const routes: Routes = [
  { path: "welcome", component: WelcomePageComponent },
  { path: "movies", component: MovieCardComponent },
  { path: "profile", component: ProfileComponent },
  { path: "", redirectTo: "welcome", pathMatch: "prefix" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
