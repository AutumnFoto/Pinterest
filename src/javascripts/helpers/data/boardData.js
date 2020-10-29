import firebase from 'firebase/app';
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

const getUserBoards = () => new Promise((resolve, reject) => {
  const user = firebase.auth().currentUser;
  axios
    .get(`${baseUrl}/Boards.json?orderBy="userUid"&equalTo="${user.uid}"`)
    .then((response) => {
      const userBoards = response.data;
      const boards = [];
      if (userBoards) {
        Object.keys(userBoards).forEach((boardId) => {
          boards.push(userBoards[boardId]);
        });
      }

      resolve(boards);
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

const addBoard = (data) => axios.post(`${baseUrl}/Boards.json`, data)
  .then((response) => {
    const update = { firebaseKey: response.data.name };
    axios.patch(`${baseUrl}/Boards/${response.data.name}.json`, update);
  }).catch((error) => console.warn(error));

export default {
  getBoards, getSingleBoard, deleteBoard, addBoard, getUserBoards
};
