import firebase from 'firebase/app';
import 'firebase/auth';

const logoutEvent = () => {
  $('#navbar-logout-button').on('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    window.location.href = '/';
  });
};

const myNavBar = (currentUser) => {
  $('#nav').html(
    `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Dinnterest</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse"
    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item mx-3" id="boards-link">
        <a class="nav-link" href="#"><i class="fas fa-utensils"></i></i> Boards</a>
      </li>
      <li class="nav-item mx-3" id="add-board-link">
        <a class="nav-link" href="#"><i class="fas fa-plus-circle"></i> Add A Board</a>
      </li>
      <li class="nav-item mx-3" id="add-dinn-link">
        <a class="nav-link" href="#"><i class="fas fa-plus-circle"></i> Add A Dinn</a>
      </li>
    </ul>
      <ul class="navbar-nav ml-auto">
        <li class="user-info-nav">
          Welcome, ${currentUser}!
        </li>
        <li class="nav-item active">
          <button class="nav-link btn btn-outline-danger" id="navbar-logout-button">Logout</button>
        </li>
      </ul>
    </div>
  </nav>`
  );

  logoutEvent();
};

export default { myNavBar };
