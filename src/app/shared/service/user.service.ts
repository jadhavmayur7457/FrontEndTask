import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/data';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        const members = response.members; // Access the nested `members` array
        const user = members.find(
          (member: any) => member.user.userId === userId
        )?.user;
        return user || null; // Return the user if found, otherwise null
      })
    );
  }

  putUser(userId: string, userData: any): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        const members = response.members; // Access nested members
        const memberIndex = members.findIndex(
          (member: any) => member.user.userId === userId
        );

        if (memberIndex !== -1) {
          // Update firstName and lastName
          members[memberIndex].user.firstName = userData.firstName;
          members[memberIndex].user.lastName = userData.lastName;
        } else {
          throw new Error(`User with ID ${userId} not found`);
        }

        return response; // Return updated object
      }),
      switchMap(
        (updatedResponse) => this.http.put<any>(this.apiUrl, updatedResponse) // Save updated response to backend
      )
    );
  }
}
