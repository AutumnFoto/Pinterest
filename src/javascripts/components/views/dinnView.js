import card from '../cards/dinnCard';
import dinnView from '../../helpers/data/mergedData';

const dinnsView = (boardId) => {
  $('#auth').html('');
  $('#add-dinn').html('<a class="nav-link" href="#">Add a Dinn</a>');
  dinnView.getSingleBoardView(boardId)
    .then((response) => {
      const { board, dinns } = response;

      $('#app').html(`<div id="single-view">
                          <h1>${board.name} Dinns</h1>
                        </div>`);
      if (dinns.length) {
        dinns.forEach((dinn) => {
          $('#app').append(card.dinnMaker(dinn));
        });
      } else {
        $('#app').append('<h1>NO DINNS!</h1>');
      }
    });
};

export default { dinnsView };
