import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BankBranchService {
    private static getBankBranchApi = '/api/v1/bank-branch';

    constructor(private http: HttpClient) {}

    getBankBranch(bankCode: any = null): Observable<any> {
        let url = BankBranchService.getBankBranchApi;
        if (bankCode) {
            url += `?bankId=${bankCode}`;
        }
        return this.http.get(url);
    }
}
