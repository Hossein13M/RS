/* tslint:disable */
export interface DepositTableItem {
    /**
     * نرخ سود
     */
    Interest?: number;
    accountNumber?: string;
    bankAccountTypeName?: string;
    bankName?: string;
    branchName?: string;

    /**
     * درصد از کل دارایی
     */
    percentageOfAssets?: number;

    /**
     * درصد از سبد سپرده
     */
    percentageOfSeporde?: number;

    /**
     * مانده
     */
    remainingAmount?: number;
}
