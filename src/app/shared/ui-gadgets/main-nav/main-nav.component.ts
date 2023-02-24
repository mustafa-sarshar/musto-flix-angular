import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

import { LocalStorageService } from "../../services/local-storage.service";

/**
 * @class
 * @description - It acts as the main app's navigation including the navigation side and navigation bar.
 */
@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.scss"],
})
export class MainNavComponent implements OnInit {
  // This property controls the way that the sidebar nav should look.
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  username: string = ""; // It holds the username value, if the user is already authenticated and logged in.

  /**
   * @constructor
   * @param breakpointObserver
   * @param router
   */
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.username = this.localStorageService.getUsernameFromLocalStorage();
  }

  /**
   * @method
   * @description - It performs when the user clicks on the App's brand
   */
  onClickAppBrand(): void {
    this.router.navigate(["/movies"]);
  }

  /**
   * @method
   * @description - It performs when the user clicks on the user profile nav item.
   */
  onClickUserProfile(): void {
    this.router.navigate(["/user-profile"]);
  }

  /**
   * @method
   * @description - It performs when the user clicks on the logout nav item.
   */
  onClickLogout(): void {
    this.localStorageService.clearLocalStorage();
    this.router.navigate(["/welcome"]);
  }
}
