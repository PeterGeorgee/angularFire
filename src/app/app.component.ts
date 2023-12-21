import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todoapp';

  constructor(private service:SharedService){}

  notes:any=[];

  refreshNotes(){
    this.service.getNotes().subscribe((res)=>{
      this.notes=res;
    })
  }

  ngOnInit(){
    this.refreshNotes();
  }

  addNotes(newNotes:string,group:string){
    this.service.addNote(newNotes,group).then((res)=>{
      console.log(res);
      this.refreshNotes();
    })
  }

  deleteNotes(id:number){
    // this.service.deleteNote(id).then((res)=>{
    //   console.log(res);
    //   this.refreshNotes();
    // })
    console.log(this.notes[id].group);
  }

  signInWithGoogle(){
    this.service.loginWithGoogle();
  }

  // signInWithFacebook(){
  //   this.service.loginWithFacebook();
  // }

  signOutFromGoogle(){
    this.service.logoutFromGoogle();
  }

}
