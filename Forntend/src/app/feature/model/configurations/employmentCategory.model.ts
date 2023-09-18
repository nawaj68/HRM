import { CompanyInfo } from "../companyinfo.model";

export interface EmploymentCategory{
    id:number;
    companyInfo:CompanyInfo;
    categoryName:string;
    status:boolean;


}