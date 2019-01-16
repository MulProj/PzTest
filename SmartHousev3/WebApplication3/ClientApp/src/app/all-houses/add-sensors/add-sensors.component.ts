import { Component, OnInit, Input} from '@angular/core';
import { Sensor } from 'src/app/app.component';
import { HttpService } from '../../Service/http.service';


@Component({
  selector: 'app-add-sensors',
  templateUrl: './add-sensors.component.html',
  styleUrls: ['./add-sensors.component.css']
})
export class AddSensorsComponent implements OnInit {

  constructor(private httpService: HttpService) { }
  /*Zmienne, które przekazał komponent-rodzic */ 
  @Input()
  houseId: number;
  @Input()
  plan: string;
/*Zmienne dla czujnika temperatury */ 
  tempName: string;
  tempMaxValue: number;
  tempMinValue: number;

  /*Zmienne dla czujnika ruchu */
  motionName: string; 

  /*Zmienne dla czujnika dymu */ 
  smokeName: string;
  smokeMaxValue: number;
  smokeMinValue: number;

  /*Zmienne dla czujnika temperatury */ 
  humidityName: string;
  humidityMaxValue: number;
  humidityMinValue: number;

  /*Zmienne przekazywane komponentom-dzieciom */
  newSensor: boolean=false;


  ngOnInit() {

  }
  addTempSensor()
  {
      const s: Sensor=({
        maxValue: this.tempMaxValue,
        minValue: this.tempMinValue,
        coordinateX: 10,
        coordinateY: 10,
        name: this.tempName,
        houseId: this.houseId,
    });

    this.httpService.addTemperatureSensor(s).subscribe(
      success=>{},
      error=>{}) 

      this.newSensor=true;
  }

  addMotionSensor()
  {
    const s: Sensor=({
      coordinateX: 10,
      coordinateY: 10,
      name: this.motionName,
      houseId: this.houseId,

    });

    this.httpService.addMotionSensor(s).subscribe(
      success=>{},
      error=>{}) 

      this.newSensor=true;
  }

  addSmokeSensor()
  {
    const s: Sensor=({
      maxValue: this.smokeMaxValue,
      minValue: this.smokeMinValue,
      coordinateX: 10,
      coordinateY: 10,
      name: this.smokeName,
      houseId: this.houseId,
  });

  this.httpService.addSmokeSensor(s).subscribe(
    success=>{},
    error=>{}) 

    this.newSensor=true;

  }
  addHumiditySensor()
  {
    const s: Sensor=({
      maxValue: this.humidityMaxValue,
      minValue: this.humidityMinValue,
      coordinateX: 10,
      coordinateY: 10,
      name: this.humidityName,
      houseId: this.houseId,
  });

  this.httpService.addHumiditySensor(s).subscribe(
    success=>{},
    error=>{}) 

    this.newSensor=true;

  }

}
