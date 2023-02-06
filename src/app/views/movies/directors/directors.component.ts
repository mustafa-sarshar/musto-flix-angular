import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Director } from "src/models";

@Component({
  selector: "app-directors",
  templateUrl: "./directors.component.html",
  styleUrls: ["./directors.component.scss"],
})
export class DirectorsComponent implements OnInit {
  directors: Director[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    console.log("directors received:", this.directors);
  }
}
