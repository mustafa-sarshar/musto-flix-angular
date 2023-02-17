import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterArray",
  pure: true,
})
export class FilterArrayPipe implements PipeTransform {
  transform(array: any[], filterString: string, propName: string): any[] {
    const _filterString = filterString.trim().toLowerCase();
    const arrayFiltered = array.filter((item) =>
      item[propName].trim().toLowerCase().includes(_filterString)
    );

    return arrayFiltered;
  }
}
