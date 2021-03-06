import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../Services/students.service';
import{ActivatedRoute,Router} from '@angular/router'
import { organization } from 'src/app/model/organization';
import { ApiService } from 'src/app/Services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Student } from 'src/app/model/Student';
import { StudentObj } from 'src/app/model/StudentObj';
import { SelectItem } from 'primeng/api/selectitem';
import{MessageService } from 'primeng/api';
@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.css'],
  providers:[StudentsService,ApiService,MessageService]
})
export class EditStudentsComponent implements OnInit {

  constructor(private _studentsService:StudentsService,private _activatedRoute:ActivatedRoute,
              private _router:Router ,private orgService:ApiService,private messageService:MessageService) { }
stud_id:number;
inst_id:number;
student:StudentObj;
saveObj:Student;
orgObj:organization[];
flag=false;
years:SelectItem[]
  ngOnInit(): void {
this.stud_id=parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
this.inst_id=parseInt(this._activatedRoute.snapshot.paramMap.get('instid'));
this._studentsService.getStudent(this.stud_id).subscribe(res=>{this.student=res.body.data,this.loadValues(),this.flag=true},
                                                            err=>{this.messageService.clear();
                                                              this.messageService.add({ severity:'error', summary:"Something went wrong" });});
this.orgService.getAllOrg().subscribe((res:any)=>{this.orgObj=res.body.data},err=>{this.messageService.clear();
                                                    this.messageService.add({ severity:'error', summary:"Something went wrong" });});

this.years=[];
this.years.push({label:'Select Year',value:''});
  this.years.push({label:'First Year',value:'1'});
  this.years.push({label:'Second Year',value:'2'});
  this.years.push({label:'Third Year',value:'3'});
  this.years.push({label:'Fourth Year',value:'4'});
  }
  editform=new FormGroup({
    id:new FormControl(),
    redgno:new FormControl(),
    institutionid: new FormControl(),
    fname: new FormControl(),
    lname: new FormControl(),
    dob: new FormControl(),
    email: new FormControl(),
    mobileno: new FormControl(),
    year: new FormControl()    
  }) 
  
  organization(id:number){
    this.editform.patchValue({institutionid:id});
  }
loadValues(){
  this.editform.patchValue({
    id:this.student.id,
    redgno:this.student.redgno,
    institutionid:this.student.org.id,
    fname:this.student.fname,
    lname:this.student.lname,
    dob:this.student.dob,
    email:this.student.email,
    mobileno:this.student.mobileno,
    year:this.student.year

  });

}
update(){
  
  this.saveObj=this.editform.value;
  console.log(this.saveObj);
  this._studentsService.updateStudent(this.saveObj).subscribe(res=>{if(res.status==200){
    this.stud_id==null?this._router.navigate(['/students',this.inst_id,this.student.org.name]):this._router.navigate(['/allstudents'])}},
    err=>{
      if(err.status==404){  this.messageService.clear();
        this.messageService.add({ severity:'error', summary:"Something went wrong" });}
   
      if(err.status==400){
        this.messageService.clear();
        this.messageService.add({ severity:'error', summary:"Update Failed " ,detail: 'One or more Column is Missing'});}
    });
}
}
