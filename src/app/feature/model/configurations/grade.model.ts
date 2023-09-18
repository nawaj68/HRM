import { CompanyInfo } from "../companyinfo.model";

export interface Grade{
    id:number,
    companyInfo:CompanyInfo,
    gradeName:string,
    gradePoint:number
}