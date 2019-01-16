import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/Service/http.service';
import { Sensor } from 'src/app/app.component';
import * as CanvasJS from '../../../assets/plots/canvasjs.min'
import { bloomAdd } from '@angular/core/src/render3/di';

@Component({
  selector: 'app-view-sensors',
  templateUrl: './view-sensors.component.html',
  styleUrls: ['./view-sensors.component.css']
})


export class ViewSensorsComponent implements OnInit {
  /*Tablica pobrana z bazy danych */
  allSensors$

  /*Tablica, która jest wyświelana w widoku */
  sensors: Sensor[]= new Array();

  constructor(private httpService: HttpService) { }

  /*Zmienna pobrana od rodzica-komponenta*/
  @Input()
  houseId

  /*Zmienne potrzebne do czasowego pobierania danych z bazy*/
  timeLeft: number = 60;
  interval;

  ngOnInit() {
    
        this.allSensors$ = this.httpService.getSensorsByHouseId(this.houseId); 
        this.allSensors$.subscribe(sen => {
          for(var i =0; i<sen.length; i++)
          {
            var s: Sensor = ({
              name: sen[i].name,
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
        this.allSensors$ = this.httpService.getSensorsByHouseId(this.houseId); 
        this.allSensors$.subscribe(sen => {
          for(var i =0; i<sen.length; i++)
          {
            this.sensors[i].temperature = sen[i].temperature;
            this.sensors[i].isOn = sen[i].isOn; 
          }
          
        })

      } else {
        this.timeLeft = 60;
      }
    },1000)

    }

return_temperature(i: number)
{
  return this.sensors[i].temperature;
}
  


}
    


