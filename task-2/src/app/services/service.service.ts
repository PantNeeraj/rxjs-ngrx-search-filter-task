import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor( private http:HttpClient) { }

  searchData(searchKey:string):Observable<any>{
    let path = `http://localhost:3000/details`;
    if(searchKey) path = `${path}?searchKey=${searchKey}`
    return this.http.get(path)
  }

  createData(formData:any){
    return this.http.post("http://localhost:3000/details",formData)
    
  }


  getData(){
    return this.http.get("http://localhost:3000/details/")
    
  }
  updateData(user:any){
    return this.http.put("http://localhost:3000/details/" +user.id,user)
  }
  deleteData(user:any){
   return this.http.delete("http://localhost:3000/details/" +user.id)
    
  }



}
