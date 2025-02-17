import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {firebaseConfig} from '../firebase_config';
import { lastValueFrom, Observable } from 'rxjs';


import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "firebase/auth";

interface ProfileCheckResponse {
  isComplete: boolean;
}


const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  app:any;
  auth: any;
  provider: any;
  displayName: string = "";
  email: string = "";
  photoUrl: string = "";
  uid: string = "";
  user: any = null;

  private LocalapiUrl: string  = "http://localhost:9090";
  private onlineUrl: string = "https://todo-app-final.onrender.com"



  constructor(private http: HttpClient) {

    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.provider = new GoogleAuthProvider();
    this.listenForAuthChanges();
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, this.provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        const user = result.user;
        this.uid = user.uid;
        this.displayName = user.displayName || '';
        this.email = user.email || '';
        this.photoUrl = user.photoURL || '';

        this.sendUidBackend(this.uid, this.email).subscribe(
          response => {
            console.log("Sent back to backend", response);
          },
          error => {
            console.error("Error sending back to backend", error);
          }
        );
      }
      return "";
    });
  }

  sendUidBackend(uid: string, email:string){
    const body = {uid, email};
    console.log(`sent : ${email} and ${uid}`)
    return this.http.post(`${this.onlineUrl}/api/save-user`, body, httpOptions)
  }

  //State Changest
  listenForAuthChanges(): void {
    console.log(" Listening for authentication state changes...");

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.uid = user.uid;
        this.displayName = user.displayName || "";
        this.email = user.email || "";
        this.photoUrl = user.photoURL || "";
        this.user = { uid: this.uid, displayName: this.displayName, email: this.email, photoUrl: this.photoUrl };

        console.log(" User session restored from Firebase:", this.user);
      } else {
        console.log(" No user session found in Firebase.");
        this.user = null;
      }
    });
  }

//check user if they are logged in for navigation pusepose
  userIsLoggedIn(): boolean {
    console.log("Checking for login status");
    return this.user !== null;
  }

  getUserIdByFirebaseUid(uid: string) {
    return this.http.get<{ userId: string }>(`${this.onlineUrl}/get-user/${uid}`, httpOptions);
  }

  isUserProfileComplete(userId: string): Observable<ProfileCheckResponse> {
    return this.http.get<ProfileCheckResponse>(`${this.onlineUrl}/api/checkUserProfile/${userId}`);
  }

  logout() {
    return this.auth.signOut().then(() => {
      console.log("User logged out");
    })
  }



}
