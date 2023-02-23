import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

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
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  username: string = "";

  /**
   * @constructor
   * @param breakpointObserver
   * @param router
   */
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usernameLocal = localStorage.getItem("username");
    if (usernameLocal) {
      this.username = usernameLocal;
    }
  }

  onClickAppBrand(): void {
    this.router.navigate(["/movies"]);
  }

  onClickUserProfile(): void {
    this.router.navigate(["/user-profile"]);
  }

  onClickLogout(): void {
    localStorage.clear();
    this.router.navigate(["/welcome"]);
  }
}
