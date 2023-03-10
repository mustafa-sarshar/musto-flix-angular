import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./shared/guards/auth.guard";
import { LeavePageGuard } from "./shared/guards/leave-page.guard";
import { UserProfileResolver } from "./shared/resolver/user-profile.resolver";

import { WelcomePageComponent } from "./views/welcome-page/welcome-page.component";
import { MovieCardComponent } from "./views/movies/movie-card/movie-card.component";
import { UserProfileComponent } from "./views/users/user-profile/user-profile.component";

/**
 * @constant
 * @description - It holds all of the routes and their corresponding components.
 */
const ROUTES: Routes = [
  { path: "welcome", component: WelcomePageComponent },
  {
    path: "movies",
    component: MovieCardComponent,
    canActivate: [AuthGuard],
    canDeactivate: [LeavePageGuard],
  },
  {
    path: "user-profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    canDeactivate: [LeavePageGuard],
    resolve: { user: UserProfileResolver },
  },
  { path: "**", redirectTo: "/movies", pathMatch: "prefix" },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
