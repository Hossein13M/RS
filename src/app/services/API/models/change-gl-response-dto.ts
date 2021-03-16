/* tslint:disable */
export interface ChangeGlResponseDto {
    balance1?: string;
    balance2?: string;
    categoryLedgerName: string;
    changes?: string;
    detailLedgerName: string;
    generalLedgerName: string;
    groupLedgerName: string;
    id: number;
    rate?: string;
    subsidiaryLedgerName: string;
    type: 'increase' | 'delete' | 'add' | 'decrease';
}
