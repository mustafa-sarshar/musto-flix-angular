import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";

import { AuthService } from "../services/auth.service";

import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserProfileResolver implements Resolve<User> {
  constructor(private authService: AuthService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> | User {
    return this.authService.getUser();
  }
}
