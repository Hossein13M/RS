import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'findTicker',
})
export class FindTickerPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return null;
    }
}
