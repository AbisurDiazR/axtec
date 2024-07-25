import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMAIL_REGEX, PASS_MAX_LENGTH, PASS_MIN_LENGTH } from '../data';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/utils/user';
import { ToastrService } from 'ngx-toastr';
import { Email } from 'src/app/utils/email';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-options',
  templateUrl: './login-options.component.html',
  styleUrls: ['./login-options.component.scss']
})
export class LoginOptionsComponent implements OnInit {
  user!: User;
  loginForm: any;
  registerForm: any;
  successMessage!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private dialogRef: MatDialogRef<LoginOptionsComponent>
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [
        Validators.required,
        Validators.maxLength(PASS_MAX_LENGTH),
        Validators.minLength(PASS_MIN_LENGTH)
      ]],
    });
    this.registerForm = this.fb.group({
      emailRegister: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      phoneRegister: ['', [Validators.required]],
      passwordRegister: ['', [
        Validators.required,
        Validators.maxLength(PASS_MAX_LENGTH),
        Validators.minLength(PASS_MIN_LENGTH)
      ]],
      displayName: ['', [Validators.required]]
    });
  }

  loginWithEmailPassword() {
    let user: User = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    };
    this.authService.loginWithEmail(user).then((result: any) => {
      if(result.user != undefined){
        if(result.user.email){
          this.authService.getUserByEmail(result.user.email).subscribe((res) => {
            let responseUser:User = {
              id: res[0].id,
              email: res[0].email,
              displayName: res[0].displayName,
              tipoUsuario: res[0].tipo,
              password: ''
            };

            if (responseUser.tipoUsuario == "Cliente") {
              this.authService.setTokenWithEmail(responseUser).then((response) => {
                this.dialogRef.close();
                localStorage.setItem('access_token',response.token);
              });
            }else{
              this.dialogRef.close();
              this.authService.logout();
            }
          });
        }
      }
    }).catch((err) => {
      let errorObject = err;
      if (errorObject.code == 'auth/invalid-credential') {
        this.toastrService.error("Las credenciales son invalidas", "¡Error al ingresar!", {
          timeOut: 10000,
          positionClass: 'toast-top-right'
        });
      }else if(errorObject.code == 'auth/too-many-requests'){
        this.toastrService.error("Muchos intentos fallidos de inicio de sesión. Restaura tu contraseña e intentalo más tarde.", "¡Usuario bloqueado!", {
          timeOut: 10000,
          positionClass: 'toast-top-right'
        });
      }
    });
  }

  registerUser() {
    let userData: User = {
      "email": this.registerForm.controls['emailRegister'].value,
      "phone": this.registerForm.controls['phoneRegister'].value,
      "password": this.registerForm.controls['passwordRegister'].value,
      "displayName": this.registerForm.controls['displayName'].value,
      "tipoUsuario": "Cliente"
    }
    this.authService.registerWithEmail(userData).then((res) => {
      let responseObject = res;
      this.successMessage = responseObject.message;

      let emailData: Email = {
        to: userData.email,
        subject: '¡Bienvenido a Axtec!',
        message: `¡Bienvenido a Axtec! Estamos encantados de tenerte con nosotros. //n Por favor verifique su correo en el siguiente enlace: //n ${responseObject.verification}`
      };
      this.authService.sendEmailVerification(emailData).then(() => {
        this.registerForm.controls['emailRegister'].setValue('');
        this.registerForm.controls['phoneRegister'].setValue('');
        this.registerForm.controls['passwordRegister'].setValue('');
        this.registerForm.controls['displayName'].setValue('');
        this.dialogRef.close();
      });
    }).catch((err) => {
      this.registerForm.controls['emailRegister'].setValue('');
      this.registerForm.controls['phoneRegister'].setValue('');
      this.registerForm.controls['passwordRegister'].setValue('');
      this.registerForm.controls['displayName'].setValue('');
      let errorObject = err.error.body;
      if (errorObject.code == 'auth/email-already-exists') {
        this.toastrService.error("El correo ya existe", "¡Error al registrar!", {
          timeOut: 10000,
          positionClass: 'toast-top-right'
        });
      }
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
