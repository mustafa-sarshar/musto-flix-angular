import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

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
