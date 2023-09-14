import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any;
  password: any;
  getuserdata: any = [];
  loginuser: any = [];
  storedata: any;

  constructor(public router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    // let getdata = localStorage.getItem('usercredentials');
    // if(getdata != null){

    //   this.storedata = JSON.parse(getdata);
    //   console.log(this.storedata);

    // }
  }
  

  async login(position: 'bottom') {
    const loading = await this.loadingController.create({
      message: 'Authenticating',
    });
    loading.present();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;


        localStorage.setItem('token', JSON.stringify(user));


        if(user.emailVerified == true){

          this.router.navigate(['/home']);
          const toast = await this.toastController.create({
            message: 'Login Successfully!',
            duration: 1500,
            position: position,
          });
  
          await toast.present();
        }else{
          const alert = await this.alertController.create({
            header: 'Alert',
            subHeader: 'Please Verify Your Email',
            message: 'errorMessage',
            buttons: ['OK'],
          });
          await alert.present();
        }

        loading.dismiss();
       
      // ...
      })
      .catch(async (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        loading.dismiss();
        console.log(errorMessage, errorCode, error);
        const alert = await this.alertController.create({
          header: 'Alert',
          subHeader: errorCode,
          message: errorMessage,
          buttons: ['OK'],
        });
        await alert.present();
        console.log('Errorcode',errorCode);
        console.log('errorMessage',errorMessage);
      });

  
  }


}
