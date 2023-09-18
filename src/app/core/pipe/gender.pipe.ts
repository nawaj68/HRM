import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "src/environments/environment";



@Pipe({name: "gender"})
export class GenderPipe implements PipeTransform {
  transform(value: string, gender: number): string { 
    return `gender=${gender}`;
  }
}