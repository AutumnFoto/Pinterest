import firebase from 'firebase/app';
import 'firebase/auth';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  // eslint-disable-next-line max-len
  const domString = '<div class="d-flex jusify-content-end"><div class="welcome-container"><span class="welcome-logo"><i class="fas fa-cookie-bite"></i></span><h4>Welcome to Dinnterest</h4><button id="google-auth" class="welcome-button btn btn-outline-success btn-lg"><i class="fab fa-google"></i></i>oogle Login</button></div></div>';
  $('#auth').html(domString);
  $('#google-auth').on('click', signMeIn);
};

export default { loginButton };
