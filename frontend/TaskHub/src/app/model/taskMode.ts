export class Task {
    _id: string;
    taskName: string;
    taskDescription: string;
    taskCreatedAt: Date;
    taskPriority: string;
    taskCompletion: string;
    userId: String;


    constructor(){
        this._id = '';
        this.taskName = "";
        this.taskDescription = "";
        this.taskCreatedAt = new Date();
        this.taskCompletion = "";
        this.taskPriority = "";
        this.userId = "";

    }
}

    