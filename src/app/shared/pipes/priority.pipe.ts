import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'priority',
})
export class PriorityPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (value) {
            if (value === 'Normal') {
                return 'کم';
            } else if (value === 'Warning') {
                return 'متوسط';
            } else if (value === 'Critical') {
                return 'بالا';
            }
        }
        return null;
    }
}
