import { Component } from '@angular/core';
import { getAuth, updatePassword, onAuthStateChanged, signOut, sendEmailVerification, deleteUser, reauthenticateWithCredential } from "firebase/auth";
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
const auth = getAuth();


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loginUser: any = [];
  userUid: any = '';
  storedata: any;
  userdetails: any = [];
  constructor(private router: Router,
    private toastController: ToastController,
    public loadingController: LoadingController
  ) {

  }

  ngOnInit() {



  }

  ionViewWillEnter() {
    this.getuserprofile();
  }


  getcredentials() {
    // let getdata = localStorage.getItem('usercredentials');
    // if (getdata != null) {
    //   this.storedata = JSON.parse(getdata);
    //   console.log(this.storedata);

    // }
  }

  getuserprofile() {
    const user = auth.currentUser;
    console.log('user=======', user);
    if (user !== null) {
      this.userUid = user.uid;
      console.log("login:userUid", this.userUid);
      this.loginUser = user.providerData[0];
      console.log("login:user", this.loginUser);

    }
  }

  verifyemail() {

  }
  updatepassword() {
    // const auth = getAuth();

    // const user = auth.currentUser;
    // const newPassword = getASecureRandomPassword();
    // if(user != null ){
    //   updatePassword(user, newPassword).then(() => {
    //     // Update successful.
    //   }).catch((error) => {
    //     // An error ocurred
    //     // ...
    //   });
    // }
    }
   

  deleteprofile() {

    const auth = getAuth();
    const user = auth.currentUser;
    if (user != null) {
      deleteUser(user).then(() => {
        console.log('Userdeleted');
        this.router.navigate(['/login']);

      }).catch((error) => {
        // An error ocurred
        // ...
        console.log('Unexpected Error data not found');
      });
    }

  }


  async logout(position: 'bottom') {
    const auth = getAuth();
    signOut(auth).then(async () => {
      // Sign-out successful.
      localStorage.removeItem('token');
      const loading = await this.loadingController.create({
        message: 'Signing Out',
      });
      loading.present();

      // console.log('Auth', auth);
      this.router.navigateByUrl('/')
      loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Logout Successfully!',
        duration: 1500,
        position: position,
      });
      loading.dismiss();
      await toast.present();
      loading.dismiss();
    }).catch((error) => {
      // An error happened.
      console.log('eror', error);

    });


  }

}
