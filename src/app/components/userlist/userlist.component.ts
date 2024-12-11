import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';
import { UserdetailComponent } from '../userdetail/userdetail.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent {
 


    users:any = [];
  
    constructor(private userService: UserService) {}
  
  
  
    ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next:(resp:any)=>{
       this.users=resp.members;
       console.log(this.users)
      },
      error:()=>{

      }
    })
    }

   
 
}
