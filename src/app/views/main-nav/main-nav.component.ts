import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Router } from "@angular/router";
import { checkIsTokenExpired } from "src/app/utils";

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
    private router: Router
  ) {}

  ngOnInit(): void {
    const un = localStorage.getItem("username");
    if (un) {
      this.username = un;
    }
  }

  onClickAppBrand(): void {
    if (checkIsTokenExpired()) {
      this.router.navigate(["/welcome"]);
    } else {
      this.router.navigate(["/movies"]);
    }
  }

  onClickUserProfile(): void {
    this.router.navigate(["/profile"]);
  }

  onClickLogout(): void {
    localStorage.clear();
    this.router.navigate(["/welcome"]);
  }
}
