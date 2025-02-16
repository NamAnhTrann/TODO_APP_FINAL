import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from '../services/database.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-wdiget',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './weather-wdiget.component.html',
  styleUrl: './weather-wdiget.component.css'
})
export class WeatherWdigetComponent {
  weather: any;
  userId:any;
  constructor(private db: DatabaseService, private route:ActivatedRoute){}



  ngOnInit(): void {
    this.db.getCurrentWeather('Sydney').subscribe(
      data => {
        // Map the API response to your widget's data structure.
        this.weather = {
          isDay: data.dt > data.sys.sunrise && data.dt < data.sys.sunset,
          temp_celcius: Math.round(data.main.temp),
          temp_min: Math.round(data.main.temp_min),
          temp_max: Math.round(data.main.temp_max),
          temp_feels_like: Math.round(data.main.feels_like),
          name: data.name,
          main: data.main
        };
      },
      error => {
        console.error('Error fetching weather data:', error);
      }
    );
  }



}
