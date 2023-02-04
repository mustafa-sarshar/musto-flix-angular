import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { checkIsTokenExpired } from "src/app/utils";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  username: string = "";

  constructor(private router: Router) {}

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
