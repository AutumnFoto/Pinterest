import 'firebase/auth';
import axios from 'axios';
import apiKeys from './apiKeys.json';
import dinnsData from './dinnsData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoards = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/Boards.json`)
    .then((response) => {
      const boards = response.data;
      const boardsArray = [];
      if (boards) {
        Object.keys(boards).forEach((boardId) => {
          boardsArray.push(boards[boardId]);
        });
      }
      resolve(boardsArray);
    })
    .catch((error) => reject(error));
});

const getSingleBoard = (boardFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Boards/${boardFirebaseKey}.json`).then((response) => {
    const thisBoard = response.data;
    resolve(thisBoard);
  }).catch((error) => reject(error));
});

const deleteBoard = (boardId) => {
  dinnsData.getboardDinns(boardId)
    .then((response) => {
      response.forEach((item) => {
        dinnsData.deleteDinn(item.firebaseKey);
      });
    })
    .then(() => {
      getSingleBoard(boardId)
        .then((response) => {
          axios.delete(`${baseUrl}/boards/${response.firebaseKey}.json`);
        });
    });
};

export default { getBoards, getSingleBoard, deleteBoard };
