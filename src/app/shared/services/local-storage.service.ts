import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

/**
 * @class
 * @description - It holds all the services for interacting with the browser's localStorage.
 */
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

  /**
   * @method
   * @description - It returns the username item from the browser's localStorage.
   * @returns
   */
  getUsernameFromLocalStorage(): string {
    return localStorage.getItem("username") || "";
  }

  /**
   * @method
   * @description - It sets the username to the the browser's localStorage using the given username.
   * @param username
   */
  setUsernameToLocalStorage(username: string): void {
    this.username = username;
    this.usernameSbj.next(this.username);
    localStorage.setItem("username", this.username);
  }

  /**
   * @method
   * @description - It returns the user's favorites from the browser's localStorage.
   * @returns
   */
  getFavoritesFromLocalStorage(): string[] {
    return localStorage.getItem("favorites").split(",");
  }

  /**
   * @method
   * @description - It sets the user's favorites to the browser's localStorage using the given favorites.
   * @param favorites
   */
  setFavoritesToLocalStorage(favorites: string[]): void {
    this.favorites = favorites;
    this.favoritesSbj.next(this.favorites.slice());
    localStorage.setItem("favorites", this.favorites.toString());
  }

  /**
   * @method
   * @description - It returns the token from the browser's localStorage.
   * @returns
   */
  getTokenFromLocalStorage(): string {
    return localStorage.getItem("token") || "";
  }

  /**
   * @method
   * @description - It sets the token to the browser's localStorage using the given token.
   * @param token
   */
  setTokenToLocalStorage(token: string): void {
    this.token = token;
    this.tokenSbj.next(this.token);
    localStorage.setItem("token", this.token);
  }

  /**
   * @method
   * @description - It removes one movie from the favorites list using the given movie id.
   * @param movieId
   */
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

  /**
   * @method
   * @description - It adds one movie to the favorites list using the given movie id.
   * @param movieId
   */
  addFavoriteMovieToLocalStorage(movieId: string): void {
    this.favorites.push(movieId);
    localStorage.setItem("favorites", this.favorites.toString());
    this.favoritesSbj.next(this.favorites.slice());
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
