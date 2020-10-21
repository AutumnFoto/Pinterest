import firebase from 'firebase/app';
import 'firebase/auth';
import userData from './userData';
import auth from '../../components/auth/auth';
import myNavBar from '../../components/navBar/navBar';
import viewHelper from '../viewHelper';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const currentUser = userData.setCurrentUser(user);
      viewHelper.viewListener('home-link');
      myNavBar.myNavBar(currentUser.name);
    } else {
      myNavBar.myNavBar('guest');
      viewHelper.viewListener('home-link');
      auth.loginButton();
    }
  });
};

export default { checkLoginStatus };
