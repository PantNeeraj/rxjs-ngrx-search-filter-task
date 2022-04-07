import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../services/service.service';
import { DialogueModel } from './course-dialogue-model';

@Component({
  selector: 'app-course-dialogue',
  templateUrl: './course-dialogue.component.html',
  styleUrls: ['./course-dialogue.component.css'],
})
export class CourseDialogueComponent implements OnInit {
  form!: FormGroup;
  allFormData: any[] = [];
  actionBtn:string="save"
  dialogueModelObj: DialogueModel = new DialogueModel();

  constructor(
    private service: ServiceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CourseDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      vehicleNo: new FormControl(''),
      chassisNo: new FormControl(''),
      modelNo: new FormControl(''),
      vehicleType: new FormControl(''),
    });
    if (this.data.action == 'editVehicle') {
      this.actionBtn="update"
      console.log(this.data.action);
      this.form.patchValue(this.data.user);
     
   
    }

  }

  save() {
    
      this.dialogueModelObj.vehicleNo = this.form.value.vehicleNo;
      this.dialogueModelObj.chassisNo = this.form.value.chassisNo;
      this.dialogueModelObj.modelNo = this.form.value.modelNo;
      this.dialogueModelObj.vehicleType = this.form.value.vehicleType;
      if (this.data.action == 'addVehicle') {
      this.service.createData(this.dialogueModelObj).subscribe((res) => {
        // alert("data added")
        this.dialogRef.close(res);
      });
    }
    if (this.data.action == 'editVehicle') {
      this.dialogueModelObj.id = this.data.user.id;

      this.service.updateData(this.dialogueModelObj).subscribe((res)=>{
        this.dialogRef.close();
      })
    }
  }
  
 

  close() {
    this.dialogRef.close();
  }
}
