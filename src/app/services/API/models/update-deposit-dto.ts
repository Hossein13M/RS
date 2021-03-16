/* tslint:disable */
export interface UpdateDepositDto {
    accountTypeId?: number;
    bankId?: number;
    blockedDepositBalance?: number;
    branchId?: number;
    depositBalance?: number;
    depositNumber?: string;
    description?: string;

    /**
     * 2020-01-04
     */
    endDate?: string;
    frequenceId?: number;
    glCode?: number;
    iban?: string;
    id: number;
    interestRate?: number;
    interestReceivedAccount?: string;

    /**
     * 2020-01-04
     */
    openingDate?: string;
    paymentDay?: number;
    penaltyRate?: number;
    preferedRate?: number;
    status?: boolean;
}
