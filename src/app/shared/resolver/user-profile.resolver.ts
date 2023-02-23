import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";

import { LocalStorageService } from "../services/local-storage.service";

/**
 * @class
 * @description - It resolves the route by checking the local storage.
 */
@Injectable({
  providedIn: "root",
})
export class UserProfileResolver implements Resolve<string> {
  constructor(private localStorageService: LocalStorageService) {}

  /**
   * @method
   * @description - It resolves the route by returning the username from the localStorage.
   * @param route
   * @param state
   * @returns - The username item from the localStorage
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string> | string {
    return this.localStorageService.getUsernameFromLocalStorage();
  }
}
