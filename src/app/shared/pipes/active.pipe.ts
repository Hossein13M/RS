import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'active' })
export class ActivePipe implements PipeTransform {
    transform(value: number, ...args: any[]): any {
        return value === 1 ? 'فعال' : 'غیرفعال';
    }
}
