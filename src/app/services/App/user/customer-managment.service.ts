import { Injectable } from '@angular/core';
import { CustomerInfoDto } from 'app/services/API/models';
import { CustomerService } from 'app/services/API/services';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CustomerManagmentService {
    customersList: BehaviorSubject<Array<CustomerInfoDto>> = new BehaviorSubject([]);

    /*
     ** start intial paging
     */
    skip: number = 0;
    limit: number = 15;
    total: number = this.limit + 1;

    type: string = '';
    name: string = '';
    nationalId: string = '';
    /*
     **  end inital paging
     */

    constructor(private customerService: CustomerService) {}

    getCustomers(type?: string, name?: string, nationalId?: string): Observable<void> {
        let param = {};

        if (this.type == type && this.name == name && this.nationalId == nationalId) {
            param = {
                limit: this.limit,
                skip: this.skip,
                ...(name && { name: name }),
                ...(nationalId && { nationalId: nationalId }),
                ...(type && { type: type }),
            };
            if (this.skip >= this.total) {
                return;
            }
        } else {
            this.clearSavedData();
            this.type = type;
            this.name = name;
            this.nationalId = nationalId;
            param = {
                limit: this.limit,
                skip: this.skip,
                ...(name && { name: name }),
                ...(nationalId && { nationalId: nationalId }),
                ...(type && { type: type }),
            };
        }

        return this.customerService.customerControllerGetCustomers(param).pipe(
            map((res) => {
                // update the oprators list
                let customersList = this.customersList.getValue();
                for (const customer of res.items) {
                    customersList.push(customer);
                }
                this.customersList.next(customersList);
                this.total = res.total;
                this.skip += this.limit;
            })
        );
    }
    clearSavedData() {
        this.skip = 0;
        this.customersList.next([]);
    }

    addCustomer(name: string, nationalId: string, type: 'legal' | 'real'): Observable<void> {
        const param = {
            body: {
                name: name,
                nationalId: nationalId,
                type: type,
            },
        };
        return this.customerService.customerControllerCreateCustomer(param).pipe(
            map((res) => {
                // update the oprators list
                let customerList = this.customersList.getValue();
                customerList.push(res);
                this.customersList.next(customerList);
            })
        );
    }
    editCustomer(id: number, name?: string, nationalId?: string, type?: 'legal' | 'real'): Observable<void> {
        const param = {
            body: {
                id: id,
                name: name,
                nationalId: nationalId,
                type: type,
            },
        };
        return this.customerService.customerControllerUpdateCustomer(param).pipe(
            map((res) => {
                // update the oprators list
                let customerList = this.customersList.getValue();
                let editedCustomer = customerList.find((customer) => customer.id == id);
                editedCustomer.name = name ? name : editedCustomer.name;
                editedCustomer.nationalId = nationalId ? nationalId : editedCustomer.nationalId;
                editedCustomer.type = type ? type : editedCustomer.type;
                this.customersList.next(customerList);
            })
        );
    }

    deleteCustomer(id: number): Observable<void> {
        const param = {
            id: id,
        };
        return this.customerService.customerControllerDeleteCustomer(param).pipe(
            map((res) => {
                // update the oprators list
                let customerList = this.customersList.getValue();
                let deletedCustomer = customerList.find((customer) => customer.id == id);
                const index = customerList.indexOf(deletedCustomer);
                if (index > -1) {
                    customerList.splice(index, 1);
                } else {
                    //if u are here there is bug and we cant find id to delete localy
                }
                this.customersList.next(customerList);
            })
        );
    }
}
