import { CompanyInfo } from "../companyinfo.model";

export interface EducationType{
    id:Number,
    companyInfo:CompanyInfo,
    educationTypeName:string,
    status:boolean
}