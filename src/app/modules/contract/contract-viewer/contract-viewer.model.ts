export interface ContractViewerModel {
    contract: string;
    data: Array<{ name: string; sections: Array<any> }>;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}
