import { Pipe, PipeTransform } from '@angular/core';
import { Tours } from '../types/tourInterface';

@Pipe({
  name: 'customFilter',
})
export class CustomFilterPipe implements PipeTransform {
  transform(items:Tours [], searchText: string): Tours[] {
    if (!items || !searchText) {
      return items;
    }
    // searchText = searchText.toLowerCase();

    const filtered : Tours[] = []

    for (let item of items) {
      if (item.tour_name.toLowerCase().includes(searchText.toLowerCase())) {
        filtered.push(item)
      }
    }
    return filtered;
  }
}
