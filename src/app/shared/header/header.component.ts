import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginOptionsComponent } from '../login-options/login-options.component';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/utils/user';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser!: User;
  userLogged: boolean = false;
  private subs = new SubSink();

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private rotuer: Router
  ) {
    this.subs.add(
      this.authService.observerCurrentUser.subscribe((res) => {
        if (res != null) {
          this.userLogged = true;
          this.authService.getUserByEmail(res.email).subscribe((res) => {
            this.currentUser = {
              id: res[0].id,
              email: res[0].email,
              phone: res[0].phone,
              tipoUsuario: res.tipo,
              password: ''
            };
            if(this.currentUser.id) localStorage.setItem('uid',this.currentUser.id);
          });
        }else{
          this.userLogged = false;
        }
      })
    );
  }

  ngOnInit() {
    //this.validateUser();
  }

  validateUser() {
  }

  loginOptions() {
    const dialogRef = this.dialog.open(LoginOptionsComponent, {
      width: '300px',
      height: 'fit-content',
      panelClass: 'axtec-dialog-border'
    });
  }

  goToProfile() {
    this.rotuer.navigate(['profile']);
  }

  goToShoppingCart() {
    this.rotuer.navigate(['profile/shopping-cart']);
  }

}
