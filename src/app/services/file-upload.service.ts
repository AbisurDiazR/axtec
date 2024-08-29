import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FileUpload } from '../utils/file-upload';
import { finalize, last, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private _db: AngularFirestore, private storage: AngularFireStorage) { }
  
  public changeProfilePicture(fileObject: FileUpload): Observable<string | undefined>{
    const basePath = '/profiles';
    const filePath = `${basePath}/${fileObject.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileObject);
    return uploadTask.snapshotChanges().pipe(
      last(), // Esperar a que la última emisión ocurra
      switchMap(() => storageRef.getDownloadURL())
    );
  }
}
