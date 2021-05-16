import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'priority' })
export class PriorityPipe implements PipeTransform {
    transform(value, ...args: any[]): any {
        if (value) {
            switch (value) {
                case 'Normal':
                    return 'کم';
                case 'Warning':
                    return 'متوسط';
                case 'Critical':
                    return 'بالا';
            }
        }
        return null;
    }
}
