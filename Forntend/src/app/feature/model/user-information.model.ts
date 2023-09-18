import { Gender } from "./configurations/gender.model";
import { MaritalStatus } from "./configurations/maritalStatus.model";

export interface UserInformation {
  id: number;
  userId: number;
  firsname: string;
  lastname: string;
  birthDate: string;
  gender: Gender;
  maritalStatus: MaritalStatus;
  nid: string;
  mobileNumber: string;
  email: string;
  cityId: number;
  stateId: number;
  zip: number;
  countryId: number;
  address1: string;
  address2: string;
  joinDate: string;
  designation: string;
  salary: number;
  branchId: number;
  bankAccountNumber: string;
  effectiveDate: string;
  isTermsPolicy: boolean;
}
