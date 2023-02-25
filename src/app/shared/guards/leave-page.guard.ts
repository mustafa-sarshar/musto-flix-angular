import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

export interface CanDeactivateComponent {
  canDeactivate: () =>
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>;
}

/**
 * @class
 * @description - It prevents any accidentally change of the current page by the user.
 */
@Injectable({
  providedIn: "root",
})
export class LeavePageGuard implements CanDeactivate<CanDeactivateComponent> {
  /**
   * @method
   * @description - Allows the page navigation to happen, only if the user accepts.
   * @param component
   * @param currentRoute
   * @param currentState
   * @param nextState
   * @returns
   */
  canDeactivate(
    component: CanDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return component.canDeactivate();
  }
}
