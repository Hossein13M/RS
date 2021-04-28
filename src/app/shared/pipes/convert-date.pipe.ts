import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
    name: 'convertDate',
})
export class ConvertDatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        if (value) {
            moment.locale('fa', { useGregorianParser: true });
            let MomentDate = moment(value).locale('fa').format('jYYYY/jMM/jDD');
            return MomentDate;
        } else return null;
    }
}
