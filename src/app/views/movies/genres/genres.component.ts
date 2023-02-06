import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Genre } from "src/models";

@Component({
  selector: "app-genres",
  templateUrl: "./genres.component.html",
  styleUrls: ["./genres.component.scss"],
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    console.log("Genres received:", this.genres);
  }
}
