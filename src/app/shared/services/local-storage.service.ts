import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  private username: string = "";
  private favorites: string[] = [];
  private token: string = "";
  usernameSbj = new Subject();
  favoritesSbj = new Subject();
  tokenSbj = new Subject();

  constructor() {}

  getUsernameFromLocalStorage(): string {
    return localStorage.getItem("username") || "";
  }

  setUsernameToLocalStorage(username: string): void {
    this.username = username;
    this.usernameSbj.next(this.username);
    localStorage.setItem("username", this.username);
  }

  getFavoritesFromLocalStorage(): string[] {
    return localStorage.getItem("favorites").split(",");
  }

  setFavoritesToLocalStorage(favorites: string[]): void {
    this.favorites = favorites;
    this.favoritesSbj.next(this.favorites.slice());
    localStorage.setItem("favorites", this.favorites.toString());
  }

  getTokenFromLocalStorage(): string {
    return localStorage.getItem("token") || "";
  }

  setTokenToLocalStorage(token: string): void {
    this.token = token;
    this.tokenSbj.next(this.token);
    localStorage.setItem("token", this.token);
  }

  removeFavoriteMovieFromLocalStorage(movieId: string): void {
    const movieIdIndex = this.favorites.indexOf(movieId);

    if (movieIdIndex > -1) {
      this.favorites.splice(movieIdIndex, 1);
      localStorage.setItem("favorites", this.favorites.toString());
    } else {
      console.error("Couldn't remove the favorite movie from local storage");
    }

    this.favoritesSbj.next(this.favorites.slice());
  }

  addFavoriteMovieToLocalStorage(movieId: string): void {
    this.favorites.push(movieId);
    localStorage.setItem("favorites", this.favorites.toString());
    this.favoritesSbj.next(this.favorites.slice());
  }
}
