import { CompanyInfo } from "../companyinfo.model";

export interface DocumentCategory{
    id:number;
    companyInfo:CompanyInfo;
    documentCategorieName:string;
    status:boolean;
}