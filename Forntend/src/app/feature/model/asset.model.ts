import { CompanyInfo } from "./companyinfo.model";

export interface Asset{
    id:number,
    userId:number,
    companyInfo:CompanyInfo,
    assetTypeId:number,
    assetCode:string,
    assetName:string,
    supplierId:number,
    manufacturerId:number,
    serialNumber:number,
    modelNumber:number,
    purchaseDate:string,
    warrantyPeriod:string,
    assetStatusId:number
}