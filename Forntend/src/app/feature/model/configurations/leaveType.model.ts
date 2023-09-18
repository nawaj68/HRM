export interface LeaveType {
    id: number;
    companyId: number;
    leaveTypeName: string;
    fullPayment: string;
    halfPayment: string;
    isMeternal:boolean;
    isUnpaid:boolean;
    isPartialLeave:boolean;

  }