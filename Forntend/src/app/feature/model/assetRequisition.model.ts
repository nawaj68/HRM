export interface AssetRequisition {
    id: number;
    userId: number;
    employeeId: number;
    assetId:number;
    approvalById: number;
    approvalDate:string;
    remarks: string; 
  }