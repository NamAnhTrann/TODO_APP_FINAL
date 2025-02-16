export class Daily {
  _id: string;
  dailyTaskName: string;
  dailyTaskCreatedAt: Date;
  userId: String;

  constructor(){
    this._id = "";
    this.dailyTaskCreatedAt = new Date();
    this.dailyTaskName = "";
    this.userId = "";

  }
}
