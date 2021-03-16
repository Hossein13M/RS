import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'active',
})
export class ActivePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (value === 1) {
            return 'فعال';
        } else {
            return 'غیرفعال';
        }
    }
}
