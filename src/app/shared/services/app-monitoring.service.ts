import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppMonitoringService {
  private isDataFetching = false;
  isDataFetchingSbj = new Subject<boolean>();

  constructor() {}

  getIsDataFetchingStatus(): boolean {
    return this.isDataFetching;
  }

  setIsDataFetchingStatus(status: boolean): void {
    this.isDataFetching = status;
    this.isDataFetchingSbj.next(status);
  }
}
