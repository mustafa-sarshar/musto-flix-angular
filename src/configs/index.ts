import { Routes } from "@angular/router";

import { WelcomePageComponent } from "src/app/views/welcome-page/welcome-page.component";
import { MovieCardComponent } from "src/app/views/movies/movie-card/movie-card.component";
import { ProfileComponent } from "src/app/views/users/profile/profile.component";

const BACKEND_SERVER_URL: string =
  "http://ec2-52-87-164-181.compute-1.amazonaws.com:443";
// "http://localhost:8080";

export { BACKEND_SERVER_URL };
