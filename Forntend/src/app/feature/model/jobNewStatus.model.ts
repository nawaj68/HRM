export interface JobNewStatus {
    id: number;
    userId: number;
    employeeId: number;
    statusType:boolean;
    nextJobStatusType: string;
    effectedDate:string;
    notificationDate: string;
    remarks: string;

  }