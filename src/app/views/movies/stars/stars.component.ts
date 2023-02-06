import { Component } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Actor } from "src/models";

@Component({
  selector: "app-stars",
  templateUrl: "./stars.component.html",
  styleUrls: ["./stars.component.scss"],
})
export class StarsComponent {
  stars: Actor[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    console.log("directors received:", this.stars);
  }
}
