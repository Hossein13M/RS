import { Injectable } from '@angular/core';
import { BankDto } from 'app/services/API/models';
import { BankService } from 'app/services/API/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class BanksService {
    constructor(private bankService: BankService) {}

    getBank(search): Observable<Array<BankDto>> {
        let param = {
            searchKeyword: search,
        };
        return this.bankService.bankControllerGetBanks(param).pipe(
            map((res) => {
                return res.items;
            })
        );
    }
}
