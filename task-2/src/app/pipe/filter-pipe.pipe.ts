import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: any, searchTerm: any[]): any {
    if(value.length==0){
      return value
    }else{
       value.filter(function(search:any){
         
       if(search.vehicleNo == searchTerm){
         return value
       }
    
    })
  }
  }

}
