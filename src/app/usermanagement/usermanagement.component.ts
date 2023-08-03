import { Component } from '@angular/core';
import { ServlocalstorageService } from '../shared/sessionstorage/servlocalstorage.service';
import { ServuserService } from '../shared/users/servuser.service';
import { User } from '../shared/users/user.model';
import { faArrowDownUpLock, faArrowsUpDown, faUserEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent {
  users: User[] = [];
  logged!:boolean;
  userEdit=faUserEdit
  newAdmin!: any;
  newAtivo!: any;
  constructor(
    private servstorage: ServlocalstorageService,
    private servuser: ServuserService) {}

  ngOnInit(){
    this.getUsers();
    this.logged=this.servstorage.get("logged")==="y";
  };

  getUsers(){
    this.servuser.getAllUSers().subscribe({
      next: user => {
        this.users=user;
      },
      error: e => window.location.replace("http://localhost:4200/**")
    });
  }
  toggleAtivo(id:number, status: boolean){
    // console.log(status);
    // console.log("ativo");
    this.newAtivo = {ativo: !status}
    this.servuser.updateUser(id, this.newAtivo).subscribe();
    this.getUsers();
  }
  toggleAdmin(id:number, status: boolean){
    this.newAdmin = {admin: !status}
    this.servuser.updateUser(id, this.newAdmin).subscribe();
    this.getUsers();
  }
}
