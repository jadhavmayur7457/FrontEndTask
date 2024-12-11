import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlistComponent } from './components/userlist/userlist.component';
import { UserdetailComponent } from './components/userdetail/userdetail.component';

const routes: Routes = [
  {path:'userlist',component:UserlistComponent},
  {
    path:'userdetail/:id',component:UserdetailComponent
  },
  {
    path:"**",redirectTo:'userlist',pathMatch:'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
