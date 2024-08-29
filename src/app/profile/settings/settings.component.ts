import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsersService } from 'src/app/services/users.service';
import { DEFAULT_PROFILE_PIC, EMAIL_REGEX, PHONE_REGEX } from 'src/app/shared/data';
import { FileUpload } from 'src/app/utils/file-upload';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  profileForm: any;
  currentUserId: string = '';
  userData: any = {};
  url: string = '';
  currentFile?: FileUpload;
  fieldsUpdated: boolean = false;

  constructor(
    private authService: AuthService,
    private usersServices: UsersService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService
  ) {
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(PHONE_REGEX)]]
    });
    this.setUser();
  }

  setUser() {
    this.authService.observerCurrentUser.subscribe((res) => {
      res ? this.currentUserId = res.uid : this.currentUserId = '';
      if (res != undefined) {
        this.userData = {
          id: res.uid,
          email: res.email ? res.email : '',
          phone: res.phoneNumber ? res.phoneNumber : '',
          password: '',
          displayName: res.displayName ? res.displayName : '',
          photoUrl: res.photoURL ? res.photoURL : DEFAULT_PROFILE_PIC
        };
        this.authService.getUserByEmail(this.userData.email).subscribe((user) => {
          let userResponse = user[0];          
          this.profileForm.controls['fullName'].setValue(userResponse.displayName);
          this.profileForm.controls['phone'].setValue(userResponse.phone);
        });
      }
    });
  }

  changePhotoProfile() {
    if (this.currentFile) {
      console.log(this.currentFile);
      this.fileUploadService.changeProfilePicture(this.currentFile).subscribe(downloadUrl => {
        if (downloadUrl) {
          this.authService.updateUserProfilePhoto(downloadUrl).then(() => {
            this.setUser();
          }).catch(error => {
            console.error('Error updating profile photo:', error);
          })
        }
      });
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.currentFile = event.target.files[0];
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        this.url = event.target.result;
      };
    }
  }

  checkChanges(){
    this.fieldsUpdated = true;
  }

  saveChanges(){
    const newData = {
      displayName: this.profileForm.controls["fullName"].value,
      email: this.userData.email,
      phone: this.profileForm.controls["phone"].value,
      tipo: "Cliente"
    }
    this.authService.updateUserData(newData).then(() => {
      this.authService.updateUserCollection(newData, this.userData.id).then(() => {
        this.setUser();
      });
    })
  }

}
