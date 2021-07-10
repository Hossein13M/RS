import { isArray } from 'rxjs/internal-compatibility';
import { UtilityFunctions } from '#shared/utilityFunctions';

export class Specification {
    constructor() {}

    public specificationModel: SpecificationModel = { limit: 10, skip: 0, searchKeyword: {} };
    public pageEvent: PageEvent = { currentIndex: 0, pageSize: 10 };

    public convertDate(date: Date): string {
        return UtilityFunctions.convertDateToGregorianFormatForServer(date);
    }

    public setPageDetailData(res): void {
        this.pageEvent.length = res.limit;
        this.pageEvent.currentIndex = res.skip / res.limit;
        this.pageEvent.length = res.total;
    }

    generateSpecificationString(): any {
        let pagingParam = '';

        if (this.specificationModel.skip !== undefined && this.specificationModel.limit !== undefined) {
            pagingParam = '?skip=' + this.specificationModel.skip + '&limit=' + this.specificationModel.limit;
        }

        if (this.specificationModel.searchKeyword && this.specificationModel.searchKeyword !== '') {
            Object.keys(this.specificationModel.searchKeyword).forEach((key) => {
                if (
                    this.specificationModel.searchKeyword[key] !== null &&
                    this.specificationModel.searchKeyword[key] !== '' &&
                    !isArray(this.specificationModel.searchKeyword[key])
                ) {
                    pagingParam = pagingParam + '&' + key + '=' + this.specificationModel.searchKeyword[key];
                }

                if (
                    this.specificationModel.searchKeyword[key] !== null &&
                    this.specificationModel.searchKeyword[key] !== '' &&
                    isArray(this.specificationModel.searchKeyword[key]) &&
                    this.specificationModel.searchKeyword[key].length > 0
                ) {
                    if (this.specificationModel.searchKeyword[key].length > 1) {
                        for (let e = 0; e < this.specificationModel.searchKeyword[key].length; e++) {
                            pagingParam = pagingParam + '&' + key + '=' + this.specificationModel.searchKeyword[key][e];
                        }
                    } else {
                        pagingParam = pagingParam + '&' + key + '=' + this.specificationModel.searchKeyword[key];
                    }
                }
            });

            if (this.specificationModel.skip === undefined || this.specificationModel.limit === undefined) {
                pagingParam = pagingParam.replace('&', '?');
            }

            return pagingParam;
        } else {
            return pagingParam;
        }
    }
}

export class SpecificationModel {
    limit?: any;
    skip?: any;
    searchKeyword?: any;
}

export interface PageEvent {
    currentIndex: any;
    length?: any;
    pageSize: any;
}
