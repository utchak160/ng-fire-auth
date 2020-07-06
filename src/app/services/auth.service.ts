import {Injectable, NgZone, OnInit} from "@angular/core";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {Constants} from "../utils/Constants";
import {User} from "../models/user";
import {auth} from "firebase";

@Injectable({
  providedIn: "root"
})
export class AuthService implements OnInit {
  userData: any;

  constructor(public afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              private router: Router,
              public ngZone: NgZone) {
  }

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem(Constants.USER_DETAILS, JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem(Constants.USER_DETAILS));
      } else {
        localStorage.setItem(Constants.USER_DETAILS, null);
        JSON.parse(localStorage.getItem(Constants.USER_DETAILS));
      }
    })
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.setUserData(res.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.sendEmailVerification().then(() => {
          window.alert('Verification Email sent. Check your inbox!');
        });
        this.setUserData(res.user).then(() => {
          localStorage.setItem(Constants.USER_DETAILS, JSON.stringify(this.userData));
        });
      }).catch((err) => {
        window.alert(err.message);
      })
  }

  sendEmailVerification() {
    return this.afAuth.currentUser.then((user) => {
      user.sendEmailVerification()
        .then(() => {
          this.router.navigate(['verify-email']);
        });
    });
  }

  forgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox!');
      }).catch(err => {
        window.alert(err.message);
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem(Constants.USER_DETAILS));
    return (user !== null && user.emailVerified !== false);
  }

  googleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  facebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  githubAuth() {
    return this.AuthLogin(new auth.GithubAuthProvider());
  }

  phoneNumberAuth() {
    return this.AuthLogin(new auth.PhoneAuthProvider());
  }

  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((res) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
        this.setUserData(res.user).then(r => console.log(r));
      }).catch(err => {
        window.alert(err.message);
      })
  }


  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    localStorage.setItem(Constants.USER_DETAILS, JSON.stringify(this.userData));
    return userRef.set(userData, {
      merge: true
    })
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem(Constants.USER_DETAILS);
      this.router.navigate(['sign-in']);
    })
  }

}
