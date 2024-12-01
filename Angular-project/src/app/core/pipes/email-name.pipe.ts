import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailName',
  standalone: true,
})
export class EmailNamePipe implements PipeTransform {
  transform(email: string | undefined): string {
    if (!email) {
      return '';
    }
    return email.split('@')[0];
  }
}
