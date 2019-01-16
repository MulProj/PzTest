import { Component, OnInit } from '@angular/core';
import { House} from '../app.component';
import { HttpService } from '../Service/http.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent {
  constructor (private httpService: HttpService, private domSanitizer: DomSanitizer){}
  
  street: string ='';
  houseNumber: number;
  postCode: string;
  town: string;
  description: string;
  
  filestring: string;
  imgInBase64;
  stan: number = null;

  
  addHouse(ev)
  {
console.log(this.street);
    console.log(ev);
    const h: House=({
      street: this.street,
      houseNumber: this.houseNumber,
      postCode: this.postCode,
      town: this.town,
      description: this.description,
      image: this.filestring 
    });
  this.httpService.addHouse(h).subscribe(
    success=>{ this.stan=1 },
    error=>{ this.stan=2 }
    )   
  }

  getBase64(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ()=> {
      this.filestring=reader.result.toString();
      this.imgInBase64=this.domSanitizer.bypassSecurityTrustHtml(this.filestring);
    };

    reader.onerror = function (error) {
    console.log('Error: ', error);
    };
 }








}






  

 
 
 export class Upload {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date=new Date();

  constructor(file:File){
      this.file=file;
  }
}


    
      








