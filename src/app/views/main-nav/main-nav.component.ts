import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

import { AuthService } from "src/app/shared/services/auth.service";

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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const un = localStorage.getItem("username");
    if (un) {
      this.username = un;
    }
  }

  onClickAppBrand(): void {
    console.log("username:", this.authService.username);
    this.router.navigate(["/movies"]);
  }

  onClickUserProfile(): void {
    this.router.navigate(["/profile"]);
  }

  onClickLogout(): void {
    localStorage.clear();
    this.authService.username = "";
    this.router.navigate(["/welcome"]);
  }
}