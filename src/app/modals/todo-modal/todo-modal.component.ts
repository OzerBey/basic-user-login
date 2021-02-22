import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.scss'],
})
export class TodoModalComponent implements OnInit {
  toDoName: any;
  toDoDesc: any;
  toDoList: Object;
  toastController: any;

  constructor(public modalım: ModalController,
    private httpYolla: HttpClient) { }
  

  ngOnInit() {}




  //webservice ile insert yapma işlemi yapılacak
  addTodo(){
    console.log(this.toDoName);//ngIf ile girilen parametreyi buraya çekiyoruz
    console.log(this.toDoDesc);
    /*//http ile de yapılabilir
    //post işlemi için bir url bir de body tanımlıyoruz
    let body={toDoName:this.toDoName,desc:this.toDoDesc};
    this.httpYolla.post('http://microwebservice.net/ecodation/todoListService.php?user_id=8',body).subscribe(data=>{
      //eğer işlemlerde bir sorun olmadan çalışmışsa bu bloga girer yani response den gelen veriyi dataya eşitliyoruz
      this.toDoList=data;
    });
    */
    this.CloseToDoModal(this.toDoName,this.toDoDesc);//(aData,bData) oluyor

  }
      
    //toDoModalClose() modal kapatma işlemi 
    CloseToDoModal(a,b) {
      // using the injected ModalController this page
      // can "dismiss" itself and optionally pass back data
      this.modalım.dismiss({
        'dismissed': true,
        aData:a,
        bData:b
      });
    }
  //message
  async presentToast(renk,mesaj) {
    const toast = await this.toastController.create({
      message: mesaj,
      color:renk,
      position:'top',
      duration: 2000
    });
    toast.present();
  }
}
