import { Component, Inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent {
  userId: string | undefined;
  user!: any ;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
      public router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.userId,"vv")
    this.userService.getUserById(this.userId).subscribe({
      next: (resp: any) => {
        this.user = resp; 
        console.log(resp,"see")
        console.log(this.user,"come")
      },
      error: () => {
        console.log('Error fetching user details');
      }
    });
  }

 



  saveChanges(): void {
    console.log("Saving changes...");
    if (this.userId && this.user) {
      this.userService.putUser(this.userId, this.user).subscribe({
        next: (resp: any) => {
          console.log('User updated successfully:', resp);
          this.router.navigate(['/userlist']); // Redirect after successful update
        },
        error: () => {
          console.log('Error updating user');
        }
      });
    }
  }
  

}
