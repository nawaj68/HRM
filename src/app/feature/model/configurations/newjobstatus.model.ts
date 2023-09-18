
import { CompanyInfo } from "../companyinfo.model";
import { Project } from './../project.model';

export interface Newjobstatus{
    id:number,
    companyInfo:CompanyInfo,
    branchId:number,
    project:Project,
    statusCode:number,
    statusTitle:number
}