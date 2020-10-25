import boardData from '../../helpers/data/boardData';

const boardMaker = (boardObject) => {
  const domString = `<div class="card board" style="width: 18rem;" id="${boardObject.firebaseKey}">
  <img src="${boardObject.image}" id="${boardObject.firebaseKey}" class="card-img-top see-dinns" alt="${boardObject.name}">
  <div class="card-body">
    <h5 class="card-title">${boardObject.name}</h5>
    <a href="#" id="${boardObject.firebaseKey}" class="btn btn-primary delete-board">Delete</a>
  </div>
</div>`;

  $('body').on('click', '.delete-board', (e) => {
    e.stopImmediatePropagation();
    const firebaseKey = e.currentTarget.id;
    $(`.card#${firebaseKey}`).remove();
    boardData.deleteBoard(firebaseKey);
  });

  return domString;
};

export default { boardMaker };
