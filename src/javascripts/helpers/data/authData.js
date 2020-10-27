import firebase from 'firebase/app';
import 'firebase/auth';
import userData from './userData';
import auth from '../../components/auth/auth';
import myNavBar from '../../components/navBar/navBar';
import viewHelper from '../viewHelper';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#auth').html('');
      // $('#app').html('<h1> Boards </h1>');
      const currentUser = userData.setCurrentUser(user);
      viewHelper.viewListener('board-link');
      myNavBar.myNavBar(currentUser.name);
    } else {
      myNavBar.myNavBar('guest');
      auth.loginButton();
      $('#nav').html('');
    }
  });
};

export default { checkLoginStatus };
