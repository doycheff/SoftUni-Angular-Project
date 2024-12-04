import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
  standalone: true
})
export class SortByPipe implements PipeTransform {
  transform<T>(
    array: T[],
    property: keyof T,
    order: 'asc' | 'desc' = 'asc'
  ): T[] {
    if (!array || !property) return array;

    return array.sort((a, b) => {
      const valA = a[property];
      const valB = b[property];

      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
