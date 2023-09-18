import { CompanyInfo } from "../companyinfo.model";
import { Project } from './../project.model';

export interface JobBaseStatus{
    id:number,
    companyInfo:CompanyInfo,
    branchId:number,
    project:Project,
    jobBaseStatusCode:string,
    jobBaseStatusTitle:string
}