import boardView from '../components/views/boardView';

const viewHelper = (id) => {
  $('#app').html('');
  switch (id) {
    case 'board-link':
      return boardView.boardView();
    // case 'add-board':
    //   return addBoardView.addBoardView();
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
