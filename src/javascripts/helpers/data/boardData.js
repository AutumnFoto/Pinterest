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
          axios.delete(`${baseUrl}/Boards/${response.firebaseKey}.json`);
        });
    });
};

const addBoard = (data) => axios.post(`${baseUrl}/boards.json`, data)
  .then((response) => {
    const update = { firebaseKey: response.data.name };
    axios.patch(`${baseUrl}/Boards/${response.data.name}.json`, update);
  }).catch((error) => console.warn(error));

export default {
  getBoards, getSingleBoard, deleteBoard, addBoard
};
