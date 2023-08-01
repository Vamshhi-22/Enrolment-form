import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'informfilter',
  pure: false,
})
export class InformfilterPipe implements PipeTransform {
  transform(value: any[], searchdata: string): any {
    return value
      ? value.filter(
          (item) => item.pfirstname.search(new RegExp(searchdata, 'i')) > -1
        )
      : [];
  }
}
