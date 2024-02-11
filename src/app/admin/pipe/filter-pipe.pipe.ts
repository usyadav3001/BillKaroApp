import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(items: any[], filterBy: string, property: string | string[] = 'caption'): any[any] {
    if (!filterBy) {
      if (!items) { return []; }
      else { return items; }
    }
    else {
      if (typeof property === 'string') {
        property = [property];
      }
      if (property.length && items) {
        return items.filter(item => {
          for (const prop of property) {
            if (item[prop].toLowerCase().indexOf(filterBy.toLowerCase()) !== -1) {
              return item;
            }
          }
        });
      }
    }
  }

}
