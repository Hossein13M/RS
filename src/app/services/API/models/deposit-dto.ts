/* tslint:disable */
export interface DepositDto {
    accountType: string;
    accountTypeId: number;
    bankId: number;
    bankName: string;
    blockedDepositBalance?: number;
    branchCode: number;
    branchId: number;
    branchName: string;
    depositBalance?: number;
    depositNumber: string;
    description?: string;

    /**
     * 2020-01-04
     */
    endDate?: string;
    frequenceId?: number;
    glCode: number;
    iban: string;
    id: number;
    interestPaidFrequency?: string;
    interestRate: number;
    interestReceivedAccount?: string;

    /**
     * 2020-01-04
     */
    openingDate: string;
    paymentDay?: number;
    penaltyRate?: number;
    preferedRate?: number;
    status: boolean;
}
