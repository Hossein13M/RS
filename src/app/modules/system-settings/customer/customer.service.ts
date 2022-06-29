import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseWithPagination } from '#shared/models/pagination.model';
import { Customer } from './customer.model';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    constructor(private readonly http: HttpClient) {}

    public getCustomersList(): Observable<ResponseWithPagination<Customer>> {
        return this.http.get<ResponseWithPagination<Customer>>(`/api/v1/customer`);
    }

    public deleteCustomer(customerId: number): Observable<void> {
        return this.http.delete<void>(`/api/v1/customer/${customerId}`);
    }

    public editCustomer(customerInfo: Customer): Observable<Customer> {
        return this.http.put<Customer>(`/api/v1/customer`, customerInfo);
    }

    public createCustomer(customerInfo: Customer): Observable<Customer> {
        return this.http.post<Customer>(`/api/v1/customer`, customerInfo);
    }
}
