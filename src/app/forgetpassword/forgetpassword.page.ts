import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth ,sendPasswordResetEmail  } from "firebase/auth";
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetpasswordPage implements OnInit {
  email:any;

  constructor(private router:Router) { }

  ngOnInit() {
  }

forget(){
  const auth = getAuth();
  sendPasswordResetEmail(auth, this.email)
    .then(() => {
      // Password reset email sent!
      this.router.navigate(['/verify-email']);
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Somthing Went worng');
      // ..
    });
}
}
