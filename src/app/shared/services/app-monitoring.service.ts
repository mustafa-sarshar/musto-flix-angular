import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

/**
 * @class
 *
 */
@Injectable({
  providedIn: "root",
})
export class AppMonitoringService {
  private isDataFetching: boolean = false; // It holds the status of data fetching
  isDataFetchingSbj: Subject<boolean> = new Subject<boolean>(); // The Subject of the isDataFetching

  constructor() {}

  /**
   * @method
   * @description - Returns the current status of data fetching
   * @returns - Current status of data fetching
   */
  getIsDataFetchingStatus(): boolean {
    return this.isDataFetching;
  }

  /**
   * @method
   * @description - Sets the current status of the data fetching
   * @param status
   */
  setIsDataFetchingStatus(status: boolean): void {
    this.isDataFetching = status;
    this.isDataFetchingSbj.next(status);
  }
}
