import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./shared/guards/auth.guard";
import { LeaveEditingGuard } from "./shared/guards/leave-editing.guard";

import { WelcomePageComponent } from "./views/welcome-page/welcome-page.component";
import { MovieCardComponent } from "./views/movies/movie-card/movie-card.component";
import { ProfileComponent } from "./views/users/profile/profile.component";

const routes: Routes = [
  { path: "welcome", component: WelcomePageComponent },
  {
    path: "movies",
    component: MovieCardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
    canDeactivate: [LeaveEditingGuard],
  },
  { path: "**", redirectTo: "welcome", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
