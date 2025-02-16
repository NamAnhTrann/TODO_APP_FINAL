import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core'; // Import this
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FullCalendarModule, MatNativeDateModule, MatInputModule, MatDatepickerModule, FormsModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css'
})
export class CalendarComponent {

  selectedDate: Date = new Date();




//   calendarOptions: CalendarOptions = {
//     initialView: 'dayGridMonth',
//     plugins: [dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin, interactionPlugin],
//     themeSystem: 'bootstrap5',
//     headerToolbar: {
//       left: 'prev,next',
//       center: 'title',
//       right: ''  // Remove the 'today' button from here
//     },
//     customButtons: {
//       myTodayButton: {
//         text: 'Today',

//       }
//     },
//     height: '300px',
//     contentHeight: '250px',
//     aspectRatio: 1.5,
//     selectable: false,
//     editable: false

// };



}
