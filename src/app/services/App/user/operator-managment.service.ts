import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperatorInfoDto, ResponseOperatorItemDto } from 'app/services/API/models';
import { OperatorService } from 'app/services/API/services/operator.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserService } from '../../API/services/user.service';

@Injectable({
    providedIn: 'root',
})
export class OperatorManagmentService {
    public operators: BehaviorSubject<Array<ResponseOperatorItemDto>> = new BehaviorSubject([]);
    skip: number = 0;
    searchKeyword: string = '';
    limit: number = 15;
    total: number = this.limit + 1;

    constructor(private operatorService: OperatorService, private userService: UserService, private http: HttpClient) {}

    addOperator(firstName: string, lastName: string, email: string): Observable<OperatorInfoDto> {
        const param = {
            body: {
                firstName: firstName,
                lastName: lastName,
                email: email,
            },
        };
        return this.operatorService.operatorControllerCreateOperator(param).pipe(
            map((res) => {
                // update the oprators list
                let operators = this.operators.getValue();
                operators.push(res);
                this.operators.next(operators);
                return res;
            })
        );
    }

    editOperator(partyID: number, firstName?: string, lastName?: string, email?: string): Observable<OperatorInfoDto> {
        const param = {
            body: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                id: partyID,
            },
        };
        return this.operatorService.operatorControllerUpdateOperator(param).pipe(
            map((res) => {
                // update the operators list
                const operators = this.operators.getValue();
                const editedOperator = operators.find((operator) => operator.id == partyID);
                editedOperator.firstName = firstName ? firstName : editedOperator.firstName;
                editedOperator.lastName = lastName ? lastName : editedOperator.lastName;
                editedOperator.email = email ? email : editedOperator.email;

                this.operators.next(operators);
                return res;
            })
        );
    }

    getOperators(searchKeyword?: string, limit = 100000, skip = 0): Observable<any> {
        return this.http.get('/api/v1/operator', { params: { limit: limit + '', skip: skip + '', searchKeyword } }).pipe(
            tap((res: any) => {
                // update the operators list
                const operators = this.operators.getValue();
                for (const operator of res.items) {
                    operators.push(operator);
                }
                this.operators.next(operators);
                this.total = res.total;
                this.skip += this.limit;
            })
        );
    }

    addUser(partyId: number, userName: string, mobileNumber: string, password: string): Observable<any> {
        const param = {
            body: {
                userName: userName,
                mobileNumber: mobileNumber,
                password: password,
                partyId: partyId,
                role: 'Operator',
            },
        };
        // todo beacuse we have just operator this is static
        return this.userService.userControllerCreateUser(param).pipe(
            map((res) => {
                // update the operators list
                let operators = this.operators.getValue();
                let addedUserOperator = operators.find((operator) => operator.id == partyId);
                addedUserOperator.userName = userName;
                addedUserOperator.mobileNumber = mobileNumber;
                addedUserOperator.userId = res.userId;

                this.operators.next(operators);
                return res;
            })
        );
    }

    clearSavedData(): void {
        this.skip = 0;
        this.operators.next([]);
    }
}
