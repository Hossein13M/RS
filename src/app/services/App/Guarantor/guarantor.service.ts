import { Injectable } from '@angular/core';
import { GuarantorDtoWithId } from 'app/services/API/models';
import { GuarantorService } from 'app/services/API/services';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseWithPagination } from '#shared/models/pagination.model';
import { UtilityFunctions } from '#shared/utilityFunctions';

export interface Guarantor {
    guarantor: string;
    code: string;
    type: string;
    otc: number;
    id: number;
}

@Injectable({
    providedIn: 'root',
})
export class GuarantorsService {
    guarantorList: BehaviorSubject<Array<GuarantorDtoWithId>> = new BehaviorSubject([]);

    /*
     ** start intial paging
     */
    skip: number = 0;
    limit: number = 15;
    total: number = this.limit + 1;

    searchKeyword: string = '';

    /*
     **  end inital paging
     */

    constructor(private guarantorService: GuarantorService, private http: HttpClient) {}

    getGuarantors(searchKeyword?: string): Observable<Array<GuarantorDtoWithId>> {
        let param = {
            searchKeyword: searchKeyword,
        };
        return this.guarantorService.guarantorControllerGetGuarantors(param).pipe(
            map((res) => {
                return res.items;
            })
        );
    }

    getGuarantor(searchKeyword?: string): Observable<any> {
        let param = {};
        if (this.searchKeyword == searchKeyword) {
            param = {
                limit: this.limit,
                skip: this.skip,
                searchKeyword: searchKeyword,
            };
            if (this.skip >= this.total) {
                return;
            }
        } else {
            this.clearSavedData();
            this.searchKeyword = searchKeyword;
            param = {
                limit: this.limit,
                skip: this.skip,
                searchKeyword: searchKeyword,
            };
        }

        return this.guarantorService.guarantorControllerGetGuarantors(param).pipe(
            map(
                (res) => {
                    // update the oprators list
                    let guarantorList = this.guarantorList.getValue();
                    for (const guarantor of res.items) {
                        guarantorList.push(guarantor);
                    }
                    this.guarantorList.next(guarantorList);
                    this.total = res.total;
                    this.skip += this.limit;
                    return res;
                },
                (error) => {
                    return error;
                }
            )
        );
    }

    clearSavedData() {
        this.skip = 0;
        this.guarantorList.next([]);
    }

    addGuarantor(guarantor: string, type: string, otc?: number): Observable<void> {
        const param = {
            body: {
                guarantor: guarantor,
                ...(otc && { otc: otc }),
                type: type,
            },
        };

        return this.guarantorService.guarantorControllerCreateGuarantor(param).pipe(
            map((res) => {
                // update the oprators list
                let guarantorList = this.guarantorList.getValue();
                guarantorList.push(res);
                this.guarantorList.next(guarantorList);
            })
        );
    }

    editGuarantor(id: number, guarantor?: string, type?: string, otc?: number): Observable<void> {
        const param = {
            body: {
                id: id,
                ...(otc && { otc: otc }),
                ...(guarantor && { guarantor: guarantor }),
                ...(type && { type: type }),
            },
        };
        return this.guarantorService.guarantorControllerUpdateGuarantor(param).pipe(
            map((res) => {
                // update the operators list
                let guarantorList = this.guarantorList.getValue();
                let editedGuarantor = guarantorList.find((guarantor) => guarantor.id == id);

                editedGuarantor.otc = otc ? otc : editedGuarantor.otc;
                editedGuarantor.guarantor = guarantor ? guarantor : editedGuarantor.guarantor;
                editedGuarantor.type = type ? type : editedGuarantor.type;

                this.guarantorList.next(guarantorList);
            })
        );
    }

    deleteGuarantor(id: number): Observable<void> {
        let param = {
            guarantorId: id,
        };

        return this.guarantorService.guarantorControllerDeleteGuarantor(param).pipe(
            map((res) => {
                let guarantorList = this.guarantorList.getValue();
                const deleteThisItem = guarantorList.find((guarantor) => guarantor.id == id);
                const index = guarantorList.indexOf(deleteThisItem);
                if (index > -1) {
                    guarantorList.splice(index, 1);
                } else {
                    //if u are here there is bug and we cant find id to delete localy
                }
                this.guarantorList.next(guarantorList);
            })
        );
    }

    public $getGuarantor(paginationParams?, searchParams?): Observable<ResponseWithPagination<Guarantor>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...paginationParams, ...searchParams });
        return this.http.get<ResponseWithPagination<Guarantor>>('/api/v1/guarantor', { params });
    }
}
