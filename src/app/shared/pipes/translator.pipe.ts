import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'translator',
})
export class TranslatorPipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case 'in progress':
                return 'در حال انجام';
            case 'pause':
                return 'ایستاده';
            case 'final':
                return 'پایان';
            default:
                return 'دیگر';
        }
    }
}
