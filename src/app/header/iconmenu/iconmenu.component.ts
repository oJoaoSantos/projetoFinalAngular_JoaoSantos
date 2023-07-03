import { Component, TemplateRef } from '@angular/core';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/users/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-iconmenu',
  templateUrl: './iconmenu.component.html',
  styleUrls: ['./iconmenu.component.css']
})
export class IconmenuComponent {
  constructor(private modalService: NgbModal) {
  }
  wishlist=faClipboard;
  profile=faUser;
  logout=faArrowRightFromBracket;
  regist=faUserPlus;
  login=faArrowRightToBracket;
  logged: boolean = false;
  userModel: User = {
    "nome": "",
    "email": "Email",
    "senha": "",
    "admin": false
  };

  openModalLogin(content: TemplateRef<any>){
		this.modalService.open(content, { centered: true });
  };

  ngOnInit(){
    console.log(this.userModel.nome);
  }
}
