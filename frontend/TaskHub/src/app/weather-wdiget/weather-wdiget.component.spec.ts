import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherWdigetComponent } from './weather-wdiget.component';

describe('WeatherWdigetComponent', () => {
  let component: WeatherWdigetComponent;
  let fixture: ComponentFixture<WeatherWdigetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherWdigetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherWdigetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
