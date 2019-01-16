import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Service/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private httpService: HttpService){}
  /*Observable, który otrzyma dane z serwera */
  allSensors$

  /*Tablica, która będzie przechowywała aktualne dane */
  sensors: Sensor[]= new Array();

  /*Zmienne do obsługi czasowej aktualizacji danych */
  timeLeft: number = 60;
  interval;
 
  ngOnInit(): void {
    this.allSensors$ = this.httpService.getSensors(); 
    
    this.allSensors$.subscribe(sen => {
      for(var i =0; i<sen.length; i++)
      {
        var s: Sensor = ({
          type: sen[i].type,
          maxValue: sen[i].maxValue,
          minValue: sen[i].minValue,
          temperature: sen[i].temperature,
          humidity: sen[i].humidity,
          smoke: sen[i].smoke,
          isMove: sen[i].isMove,
          sensorId: sen[i].sensorId,
          isOn: sen[i].isOn,
          houseId: sen[i].houseId,
          house: sen[i].house,
        
        });
        this.sensors.push(s);
      }    
})

this.interval = setInterval(() => {
  if(this.timeLeft > 0) {
    this.allSensors$ = this.httpService.getSensors(); 
    this.allSensors$.subscribe(sen => {
     /*Jeśli użytkownik dodał jakieś sensory, tablica musi zostać powiększona */
      if(sen.length>this.sensors.length)
      {
        var s1: Sensor=({
          type: null,
          maxValue: null,
          minValue: null,
          temperature: null,
          humidity: null,
          smoke: null,
          isMove: null,
          sensorId: null,
          isOn: null,
          houseId: null,
          house: null,
        
        });
        /*Dopóki tablica z pobranymi danymi będzie większa od posiadanej tablicy, trzeba do niej dodawac elementy, które później będziemy aktualizować */
        while(sen.length>this.sensors.length)
          this.sensors.push(s1);
        
        for(var i =0; i<sen.length; i++)
        {
          this.sensors[i].temperature = sen[i].temperature;  
      //    if(this.sensors[i].temperature>this.sensors[i].maxValue || this.sensors[i].temperature<this.sensors[i].minValue)
       //   {
      //      alert("Alarm!! Obecna temperatura czujnika "+this.sensors[i].name+"to: "+this.sensors[i].temperature);
     //     }
          this.sensors[i].name = sen[i].name;
          this.sensors[i].isOn = sen[i].isOn;
          if (this.sensors[i].isOn == true)
          {
            alert("Alarm!! Obecna temperatura czujnika "+this.sensors[i].name+"to: "+this.sensors[i].temperature);
          }
          this.sensors[i].smoke = sen[i].smoke;
          this.sensors[i].humidity = sen[i].humidity;
          this.sensors[i].isMove = sen[i].isMove;
          

        }

      }
      /*Jeśli użytkownik usunął jakieś sensory, tablica musi zostać zmniejszona */
      else if(sen.length<this.sensors.length)
      {
        while(sen.length<this.sensors.length)
          this.sensors.pop();
        for(var i =0; i<sen.length; i++)
        {
          this.sensors[i].temperature = sen[i].temperature; 
     //     if(this.sensors[i].temperature>this.sensors[i].maxValue || this.sensors[i].temperature<this.sensors[i].minValue)
      //    {
     //       alert("Alarm!! Obecna temperatura czujnika "+this.sensors[i].name+"to: "+this.sensors[i].temperature);
      //    } 
          this.sensors[i].name = sen[i].name;
          this.sensors[i].isOn = sen[i].isOn;
          if (this.sensors[i].isOn == true)
          {
            alert("Alarm!! Obecna temperatura czujnika "+this.sensors[i].name+"to: "+this.sensors[i].temperature);
          }
          this.sensors[i].smoke = sen[i].smoke;
          this.sensors[i].humidity = sen[i].humidity;
          this.sensors[i].isMove = sen[i].isMove;
          
        }
      }
      /*Jeśli użytkownik użytkownik nie dodawał ani usuwał sensorów */
      else{
        for(var i =0; i<sen.length; i++)
        {
          this.sensors[i].temperature = sen[i].temperature;  
      //    if(this.sensors[i].temperature>this.sensors[i].maxValue || this.sensors[i].temperature<this.sensors[i].minValue)
      //    {
     //       alert("Alarm!! Obecna temperatura czujnika "+this.sensors[i].name+"to: "+this.sensors[i].temperature);
     //     }
          this.sensors[i].name = sen[i].name;
          this.sensors[i].isOn = sen[i].isOn;
          if (this.sensors[i].isOn == true)
          {
            alert("Alarm!! Obecna temperatura czujnika " + this.sensors[i].name + "to: " + this.sensors[i].temperature);
          }
          this.sensors[i].smoke = sen[i].smoke;
          this.sensors[i].humidity = sen[i].humidity;
          this.sensors[i].isMove = sen[i].isMove;
          
        }
      }

      console.log(this.sensors);
      
    })

  } else {
    this.timeLeft = 60;
  }
},4000)
  }
  title = 'SmartHome';

  
}

export interface House{
  houseId?: number;
  street?: string;
  houseNumber?: number;
  postCode?: string;
  town?: string;
  description?: string;
  sensors?: Sensor[];
  image?: String;
  
  
}
export interface Sensor{ 
  temperature?: number;
  humidity?: number;
  smoke?: number;
  isMove?: boolean;

  sensorId?: number;
  type?: string;
  maxValue?: number;
  minValue?: number;
  isOn?: boolean;
  coordinateX?: number;
  coordinateY?: number;
  name?: string;
  houseId?: number;
  house?: House[];


}
