import boardData from './boardData';
import dinnData from './dinnsData';

const getSingleBoardView = (boardId) => new Promise((resolve, reject) => {
  boardData.getSingleBoard(boardId)
    .then((boardResponse) => {
      dinnData.getboardDinns(boardResponse.firebaseKey)
        .then((dinnResponse) => {
          const finalObject = { board: boardResponse, dinns: dinnResponse };
          resolve(finalObject);
        });
    }).catch((error) => reject(error));
});

export default { getSingleBoardView };
