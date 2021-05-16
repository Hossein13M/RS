import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'readStatus' })
export class ReadStatusPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (value === 'Unread') return 'خوانده نشده';
        else if (value === 'Read') return 'خوانده شده';
    }
}
