/*import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalPageComponent } from '../modals/modal-page/modal-page.component';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
public userData:any=[];
public username:string;
public password:string;
public sifreUnutma:boolean;
public noAl:any;
public todoList:any;
  constructor(public router:Router, public toastController: ToastController,private http:HttpClient,public modalController: ModalController,private activatedRoute: ActivatedRoute) {
    console.log("Merhaba");
    let uData = JSON.parse(localStorage.getItem('userJSON'));
    if(uData){
      console.log("xxxx");
      this.userData = JSON.parse(localStorage.getItem('userJSON'));
      console.log('JSON'+this.userData.id );

        ///Verileri Anasayfayi doldurmak için çek
        let body = {serviceName:'todoList',user_id:this.userData.id}
    this.http.post('http://microwebservice.net/ecodation/webService.php',body).subscribe(data=>{
      this.todoList = data;
    })


    }
  

  }


// Login Fonksiyon

login(){

  console.log("UserName:"+this.username);
  console.log("Password:"+this.password);
  let body = {serviceName:'login',email:this.username,sifre:this.password}
  this.http.post('http://microwebservice.net/ecodation/webService.php',body).subscribe(data=>{
    
    if(data==0){
        console.log("Hata");
        this.presentToast('danger','Yanlış Bilgi Tekrar Dene..');
      }else{
        this.userData = data[0];
        localStorage.setItem('userJSON',JSON.stringify(this.userData));
        this.presentToast('success','Hoşgelsin...'+this.userData.ad);
      }
      

  })


}

cikis(){
  localStorage.clear();
  this.userData = [];
}

/// Uyarı Mesaj

async presentToast(renk,mesaj) {
  const toast = await this.toastController.create({
    message: mesaj,
    color:renk,
    position:'top',
    duration: 2000
  });
  toast.present();
}







//Modal Aç
async userModal() {
  const modal = await this.modalController.create({
    component: ModalPageComponent,
    cssClass: 'my-custom-class'
  });

  modal.onDidDismiss().then(data=>{
    console.log("11111");
   this.userData = JSON.parse(localStorage.getItem('userJSON'));
    //console.log(data.data.veri);
    console.log("Modal Kapatildi");
  })
  return await modal.present();
}




/// şifremi unuttum
sifremiUnuttum(status,email){

  console.log(status);
  if(status=='true'){
    this.sifreUnutma=true;

    if(email){
      this.sifreUnutma=false;
      console.log("şifre gönderme....");
      let body = {serviceName:'password',email:email}
      this.http.post('http://microwebservice.net/ecodation/webService.php',body).subscribe(data=>{
        console.log(data);
      })
      this.presentToast('success','mail gönderildi');
    }


  }else{
    console.log("buradayim");
    this.sifreUnutma=false;
 
  }
 
}

/// Detay sayfası yönlendirme;

detayAc(veri){
  console.log(veri);
  this.router.navigate(['detay',JSON.stringify(veri)]);
}
}
*/
import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ModalPageComponent } from '../modals/modal-page/modal-page.component';
import { Router } from '@angular/router';
import { TodoModalComponent } from '../modals/todo-modal/todo-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public userData:any=[];
  public username:string;
  public password:string;
  public i:any;
  sifreUnutma: boolean;
  public todoList:any; // JSON dönecegi icin any yaptım

  constructor(public toastController: ToastController,
    public router:Router,
    private httpYolla: HttpClient,
    public modalController: ModalController) {
    let uData=JSON.parse(localStorage.getItem("userJSON"));
    if(uData){// veri doluysa buraya girer
      this.userData=JSON.parse(localStorage.getItem("userJSON"));
      console.log('JSON');
      console.log("buraya girdi");
     
        ///Verileri Anasayfayi doldurmak için çek
        let body = {serviceName:'todoList',user_id:this.userData.id}
        this.httpYolla.post('http://microwebservice.net/ecodation/webService.php',body).subscribe(data=>{
        this.todoList = data;//ilk açıldıgında gelen verileri todoListe dolduruyor
      })
    }
  }

    //login Fonksiyon
    login(){
 
  console.log("Username :"+this.username); // iki türlü de tanımlanabiliyor heö globelde tanımlayıp this anahtar kelimesi ile çağrılabilir
  // ya da parametre olarak tanımlanıp fonksiyon içinden çağrılanbilir
  console.log("Password :"+this.password);

  let body = {serviceName:'login',email:this.username,sifre:this.password}
  this.httpYolla.post('http://microwebservice.net/ecodation/webService.php',body).subscribe(data=>{
    
    if(data==0){
        console.log("Hata");
        this.presentToast1('danger','Yanlış Bilgi Tekrar Dene..');
      }else{
        this.userData = data[0];
        localStorage.setItem('userJSON',JSON.stringify(this.userData));
        this.presentToast1('success','Hoşgeldiniz...'+this.userData.ad);
      }
  })
}
//cikis()
cikis(){
  localStorage.clear();
  this.userData =[];
}

//Modal Ac
async openModal() {
  const modal = await this.modalController.create({
    component: ModalPageComponent,
    cssClass: 'my-custom-class'
  });
  
  modal.onDidDismiss().then(data=>{ // tam modal kapandiginda bunun içine girer
    console.log("3. Hamle :modal kapanıyor !!");
    this.userData = JSON.parse(localStorage.getItem('userJSON'));
    //console.log(data.data.veri);
    console.log("Modal Kapatildi");
  })
  return await modal.present();
}

  //Todo-Modal aç
  //Modal Ac
async openToDoModal() {
  const modal = await this.modalController.create({
    component: TodoModalComponent,
    cssClass: 'my-custom-class'
  });
  console.log("onDidMiss girdi");
  modal.onDidDismiss().then(toDoData=>{
    console.log("onDidMissCikiyor");
      //body deki todoName ile service gönderilen deger aynı olmalo
     //post işlemi için bir url bir de body tanımlıyoruz
     let body = {serviceName:'todoAd',todoName:toDoData.data.aData,desc:toDoData.data.bData,user_id:this.userData.id}
     this.httpYolla.post('http://microwebservice.net/ecodation/webService.php',body).subscribe(data=>{
       //eğer işlemlerde bir sorun olmadan çalışmışsa bu bloga girer yani response den gelen veriyi dataya eşitliyoruz
       this.todoList=data; // kapatırken todliste eklenenlerle birlikte açılacak ve güncellenmiş olacak 
      // burada modalı kapatırken güncel eklenen veriyi de todoListe atıyor öyle açılıyor   
      this.presentToast('success','Kayıt Eklendi');
      });
 
  })
  return await modal.present();
}

      //liste silme işlemi (fonksiyonu)
      toDoDelete(id){
        console.log("deleted..!!");
          //body deki todoName ile service gönderilen deger aynı olmalo
     //post işlemi için bir url bir de body tanımlıyoruz
     let body = {serviceName:'todoDelete',user_id:this.userData.id,itemId:id}
     this.httpYolla.post('http://microwebservice.net/ecodation/webService.php',body).subscribe(data=>{
       //eğer işlemlerde bir sorun olmadan çalışmışsa bu bloga girer yani response den gelen veriyi dataya eşitliyoruz
       this.todoList=data; // kapatırken todliste eklenenlerle birlikte açılacak ve güncellenmiş olacak 
      // burada modalı kapatırken güncel eklenen veriyi de todoListe atıyor öyle açılıyor   
      this.presentToast('danger','Kayıt Silindi');
      });
      }

    //Uyarı mesaj (Toast message)
    async presentToast(renk,toastMesaj) {
      const toast = await this.toastController.create({
        message: toastMesaj,
        color:renk,
        position:"top",
        duration: 2000
        });
        toast.present();
        }

         //Uyarı mesaj (Toast message) login olurken aşagıdan çıksın istediö
    async presentToast1(renk,toastMesaj) {
      const toast = await this.toastController.create({
        message: toastMesaj,
        color:renk,
        position:"bottom",
        duration: 2000
        });
        toast.present();
        }
      //şifremi unuttum
    sifremiUnuttum(status,email){
      if(status=='true'){
        console.log("status :true da şuan");
          this.sifreUnutma=true;

          if(email){
            let body = {serviceName:'password',email:email}
            this.httpYolla.post('http://microwebservice.net/ecodation/cek/webServicem.php',body).subscribe(data=>{
              console.log(data);
            });
            this.presentToast('success',email+' adresine şifre gönderildi..');
            this.sifreUnutma=false;//şifremi unutum fasle yaparsak gönderme işleminden sonra false yapar ve main page e döner
            console.log("şifre gönderildi");
          }

          
      }else{
        this.sifreUnutma=false ;
        console.log(this.sifreUnutma +"sifre asdsa");
      }
     }
      userLoginKontrol(){
        this.sifreUnutma=false;
      }

        /// Detay sayfası yönlendirme;
        detayAc(veri){
        console.log(veri);
        this.router.navigate(['detay',JSON.stringify(veri)]);
      }
   }