import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/taskMode';
import { User } from '../model/userModel';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private LocalapiUrl: string  = "http://localhost:9090";
  private onlineUrl: string = "https://todo-app-final.onrender.com"
  private apiKey = 'ae797d8c6c4ebad7430f7c8a8b4b8e35'; //
  private apiUrl = 'https://api.openweathermap.org/data/2.5';


  constructor(private http: HttpClient) {}

  getUserId(id:string){ //will be use when update user
    return this.http.get(`${this.onlineUrl}/get/user/${id}`, httpOptions)
  }

  getTask(){
    return this.http.get(`${this.onlineUrl}/get/all/task/api`, httpOptions)
  }


  getTaskById(taskId: string){
    return this.http.get<Task>(`${this.onlineUrl}/get/task/api/${taskId}`)
  }

  getTaskByUser(userId: string){
    return this.http.get(`${this.onlineUrl}/get/user/task/api/${userId}`, httpOptions)
  }

  addTask(userId: string, taskData: Task) {
    const { _id, ...taskDataWithoutId } = taskData;
    const apiUrl = `${this.onlineUrl}/add/task/api/${userId}`;
    return this.http.post(apiUrl, taskDataWithoutId, httpOptions);
  }

  removeTask(taskId: string){
    return this.http.delete(`${this.onlineUrl}/delete/task/api/${taskId}`, httpOptions)
  }

  updateTask(taskId: string, taskData: Task) {
    const { taskName, taskPriority, taskCompletion, taskDescription } = taskData;
    const updatedTask = { taskName, taskPriority, taskCompletion, taskDescription };
    const apiUrl = `${this.onlineUrl}/update/task/api/${taskId}`;
    return this.http.put(apiUrl, updatedTask, httpOptions);
  }

  updateUser(userId: string, userData: User) {
    const {userFirstName, userLastName, userAddress, userPhoneNumber} = userData;
    const updateUser = {userFirstName, userLastName, userAddress, userPhoneNumber};
    return this.http.put(`${this.onlineUrl}/api/update/user/${userId}`, updateUser, httpOptions)

  }


  getCurrentWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }


  updateTaskStatus(taskId: string, newStatus: string){
    return this.http.put(`${this.onlineUrl}/update/task/status/api/${taskId}`, {newStatus})
  }


  addDailyTask(userId: string, dailyData:any){
  const {_id, ...dailyDataWithoutId} = dailyData;
    return this.http.post(`${this.onlineUrl}/add/daily/api/${userId}`, dailyDataWithoutId, httpOptions )
  }

  displayDailyYask (userId:string){
    return this.http.get(`${this.onlineUrl}/get/daily/api/${userId}`, httpOptions)

  }

  removeDaily(dailyId: string){
    return this.http.delete(`${this.onlineUrl}/delete/daily/api/${dailyId}`)
  }




}




  // addTask(userId: string, taskData: Task) {
  //   const { _id, ...taskDataWithoutId } = taskData;
  //   const apiUrl = `${this.LocalapiUrl}/add/task/api/${userId}`;
  //   return this.http.post(apiUrl, taskDataWithoutId, httpOptions);
  // }
