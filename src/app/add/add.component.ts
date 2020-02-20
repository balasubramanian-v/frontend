import { Component, OnInit } from '@angular/core';
import{ApiService} from '../organization/api.service';
import{Router} from '@angular/router';
import {organization} from '../organization/organization';
import{FormGroup,FormControl} from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  org:organization=new organization();
  submitted=false;
  constructor(private _apiService:ApiService,private _router:Router) { }

  ngOnInit(): void {
  }
  addForm=new FormGroup({
    name:new FormControl,
    alias:new FormControl,
    type:new FormControl,
    createdOn:new FormControl
  });
  save(){
    this.org=this.addForm.value;
    console.log(this.org);
    this._apiService.addOrg(this.org).subscribe(data=>console.log(data));
    
  }
}
