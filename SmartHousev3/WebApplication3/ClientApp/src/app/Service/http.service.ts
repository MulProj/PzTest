import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { House, Sensor } from '../app.component';

@Injectable()

export class HttpService {

  constructor(private http: HttpClient) { }

  getHouses(): Observable<Array<House>>{
    return this.http.get<Array<House>>('https://localhost:5001/api/houses/gethouses');
  }
  getSensors() :Observable<Array<Sensor>>{
    return this.http.get<Array<Sensor>>('https://localhost:5001/api/sensors/getsensors')
  }
  getSensorsByHouseId(houseId: number):Observable<Array<Sensor>>{
    return this.http.get<Array<Sensor>>('https://localhost:5001/api/sensors/getsensorsbyhouseid?houseid='+houseId)
  }
  updateTemperatureSensor(sensor: Sensor):Observable<Sensor>{
    return this.http.post('https://localhost:5001/api/Sensors/UpdateTemperatureSensor', sensor)
  }
  updateHumiditySensor(sensor: Sensor):Observable<Sensor>{
    return this.http.post('https://localhost:5001/api/Sensors/UpdateHumiditySensor', sensor)
  }
  updateSmokeSensor(sensor: Sensor):Observable<Sensor>{
    return this.http.post('https://localhost:5001/api/Sensors/UpdateSmokeSensor', sensor)
  }
  updateMotionSensor(sensor: Sensor):Observable<Sensor>{
    return this.http.post('https://localhost:5001/api/Sensors/UpdateMotionSensor', sensor)
  }
  addHouse(house: House):Observable<House>{
    return this.http.post('https://localhost:5001/api/Houses/addhouse', house)
  }
  delHouse(houseId: number):Observable<House>{
    return this.http.get('https://localhost:5001/api/Houses/deletehouse?houseid='+ houseId)
  }
  addTemperatureSensor(sensor: Sensor):Observable<Sensor>{
    return this.http.post('https://localhost:5001/api/Sensors/AddTemperatureSensor', sensor) 
  }
  addMotionSensor(sensor: Sensor):Observable<Sensor>{
    return this.http.post('https://localhost:5001/api/Sensors/AddMotionSensor', sensor)
  }
  addHumiditySensor(sensor: Sensor):Observable<Sensor>{
    return this.http.post('https://localhost:5001/api/Sensors/AddHumiditySensor', sensor)
  }
  addSmokeSensor(sensor: Sensor):Observable<Sensor>{
    return this.http.post('https://localhost:5001/api/Sensors/AddSmokeSensor', sensor)
  }
  
}
