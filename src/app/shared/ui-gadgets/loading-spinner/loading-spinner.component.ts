import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { AppMonitoringService } from "../../services/app-monitoring.service";
import { Subscription } from "rxjs";

/**
 * @class
 * @description - It acts as a loading spinner while the data is still getting fetched or loaded or uploaded.
 */
@Component({
  selector: "app-loading-spinner",
  templateUrl: "./loading-spinner.component.html",
  styleUrls: ["./loading-spinner.component.scss"],
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {
  @Input("message") message = "Please wait...";
  showSpinner = false;
  isDataFetchingSubs = new Subscription();

  /**
   * @constructor
   * @param appMonitoringService
   */
  constructor(private appMonitoringService: AppMonitoringService) {}

  ngOnInit(): void {
    this.showSpinner = this.appMonitoringService.getIsDataFetchingStatus();
    this.isDataFetchingSubs =
      this.appMonitoringService.isDataFetchingSbj.subscribe({
        next: (isDataFetching: boolean) => {
          this.showSpinner = isDataFetching;
        },
      });
  }

  ngOnDestroy(): void {
    this.isDataFetchingSubs.unsubscribe();
  }
}
