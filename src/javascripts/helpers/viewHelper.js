// import firebase from 'firebase/app';
// import userData from './data/userData';

// const setUser = () => new Promise((resolve) => {
//   firebase.auth().onAuthStateChanged((user) => {
//     const currentUser = userData.setCurrentUser(user);
//     resolve(currentUser);
//   });
// });

const viewHelper = (id) => {
  $('#app').html('');
  switch (id) {
    case 'home-link':
      return console.warn('home-link is workin!');
    default:
      return console.warn('nothing clicked');
  }
};

const viewListener = (view) => {
  viewHelper(view);
  $('body').on('click', 'li.nav-item', (e) => {
    viewHelper(e.currentTarget.id);
  });
};

export default { viewListener };