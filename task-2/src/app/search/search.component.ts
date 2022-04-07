import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, switchMap, tap } from 'rxjs';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { CourseDialogueComponent } from '../course-dialogue/course-dialogue.component';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, AfterViewInit {
  allVehicleData$:Observable<any>=new Observable;
  isEdit = false;
  allData:any[]=[];
  reqData: any;
  @ViewChild('myInput') myInput: any;
  

  constructor(private service: ServiceService,
     private dialog: MatDialog,
    private snackBar: MatSnackBar) {}

    openSnackBar(message:any,action:any){
      this.snackBar.open(message,action)
    }
  ngOnInit(): void {
    this.getLatestData()
      
  }
  getLatestData(){
    this.allVehicleData$= this.service.getData().pipe(
      tap((res:any)=>{
         this.allData=res
      })
    )
  }
  ngAfterViewInit(): void {
    const searchTerm = fromEvent(this.myInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      distinctUntilChanged()
    );

    searchTerm.subscribe((res) => {
      console.log(this.allData)
      if (res) {
        this.allData = this.allData.filter((data) => {
          
          return data.vehicleNo == res;
        });
      } else {
        this.getLatestData();
      }
    });

   
  }

 
  editRow(user: any, action: any) {
    let d = this.dialog.open(CourseDialogueComponent, {
      data: { user: user, action: action },
    });
    d.afterClosed().subscribe((res) => {
      this.getLatestData();
    });
  }

  deleteRow(user: any) {
    this.service.deleteData(user).subscribe((res) => {
    
      this.getLatestData();
    });
  }

  openDialog(action: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let d = this.dialog.open(CourseDialogueComponent, {
      data: { action: action },
    });
    d.afterClosed().subscribe((res) => {
      this.getLatestData();
    });
  }
}
