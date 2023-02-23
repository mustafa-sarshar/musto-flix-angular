import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

/**
 * @interface
 * @description - Format options for dateFormat function.
 */
interface DateTimeFormatOptions {
  formatMatcher?: "basic" | "best fit" | "best fit" | undefined;
  dateStyle?: "full" | "long" | "medium" | "short" | undefined;
  timeStyle?: "full" | "long" | "medium" | "short" | undefined;
  dayPeriod?: "narrow" | "short" | "long" | undefined;
  fractionalSecondDigits?: 1 | 2 | 3 | undefined;
}

/**
 * @class
 * @description - It holds all the necessary utility functions for interacting with data.
 */
@Injectable({
  providedIn: "root",
})
export class UtilityService {
  constructor() {}

  /**
   * @method
   * @description - It formats the given date based on the given format options.
   * @param date
   * @param format
   * @param options
   * @returns
   */
  public dateFormat(
    date: Date,
    format = "yyyy-mm-dd",
    options: DateTimeFormatOptions = {
      formatMatcher: "basic",
      dateStyle: "full",
      timeStyle: "full",
      dayPeriod: "narrow",
      fractionalSecondDigits: 2,
    }
  ): string {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    if (format === "yyyy-mm-dd") return [year, month, day].join("-");
    if (format === "dd-mm-yyyy") return [day, month, year].join("-");
    if (format === "toLocaleDateString")
      return d.toLocaleDateString("en-US", options);
    else throw new Error("The format couldn't be recognized");
  }

  /**
   * @method
   * @description - It extracts a non-typed response
   * @param res
   * @returns
   */
  public extractResponseData(res: Response): any {
    return res || [];
  }

  /**
   * @method
   * @description - It returns an error message based on the type of the given http error response.
   * @param httpErrorRes
   * @returns
   */
  public handleError(httpErrorRes: HttpErrorResponse): Observable<never> {
    if (httpErrorRes.error) {
      if (httpErrorRes.error.message) {
        console.error(
          `Error Status: ${httpErrorRes.status}\nError message: ${httpErrorRes.error.message}`
        );

        return throwError(() => new Error(httpErrorRes.error.message));
      } else {
        console.error(
          `Error Status: ${httpErrorRes.status}\nError body: ${httpErrorRes.error}`
        );

        return throwError(() => new Error(httpErrorRes.error));
      }
    } else {
      return throwError(
        () => new Error("Something went wrong! Please try again later.")
      );
    }
  }
}
