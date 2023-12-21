import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { GoogleAuthProvider, getAuth, FacebookAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private fs:Firestore, private auth:AngularFireAuth) { }

  getNotes(){
    let notesCollection= collection(this.fs,'notes');
    return collectionData(notesCollection,{idField:'id'});
  }

  addNote(desc:string,group:string){
    let data={description:desc,group:group};
    let notesCollection= collection(this.fs,'notes');
    return addDoc(notesCollection,data);
  }

  deleteNote(id:string){
    let docRef=doc(this.fs,'notes/'+id);
    return deleteDoc(docRef);
  }

  loginWithGoogle(){
    return this.auth.signInWithPopup(new GoogleAuthProvider).then(res=>{
      console.log(res);
    }, err => {
      alert(err.message);
    })
  }

  // loginWithFacebook(){
  //   return this.auth.signInWithPopup(new FacebookAuthProvider).then(res=>{
  //     console.log(res);
  //   }, err => {
  //     alert(err.message);
  //   })
  // }

  logoutFromGoogle(){
    const auth=getAuth();
    this.auth.signOut().then(()=>{
      console.log("Sign out successful");
    }, err => {
      alert(err.message);
    })
  }

}
