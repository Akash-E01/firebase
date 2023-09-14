import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  fullname: any;
  email: any;
  password: any;
  signupdata: any = [];


  constructor(public router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController) { }

  ngOnInit() {
  }

  async signup() {
    const loading = await this.loadingController.create({
      message: 'Authenticating',
    });
    loading.present();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then(async (userCredential) => {
        // Signed in 
        loading.dismiss();
        const user = userCredential.user;
        sendEmailVerification(user)
          .then(() => {
            // Email verification sent!
            console.log('Email verification sent');
          });
        const alert = await this.alertController.create({
          header: 'Alert',
          subHeader: 'Congratualations',
          message: 'You havs Successfully Sign Up! & An email has sent...please',
          buttons: ['OK'],
        });
        await alert.present();
        this.email = '';
        this.password = '';
        this.router.navigate(['login']);

      })
      .catch(async (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Alert',
          subHeader: errorCode,
          message: errorMessage,
          buttons: ['OK'],
        });
        await alert.present();


        console.log('Errorcode', errorCode);
        console.log('errorMessage', errorMessage);


      });




  }




}

