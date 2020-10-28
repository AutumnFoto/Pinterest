import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getDinns = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/Dinns.json`)
    .then((response) => {
      const dinns = response.data;
      const dinnsArray = [];
      if (dinns) {
        Object.keys(dinns).forEach((dinnId) => {
          dinnsArray.push(dinns[dinnId]);
        });
      }
      resolve(dinnsArray);
    })
    .catch((error) => reject(error));
});

const getboardDinns = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/Dinns.json?orderBy="boardId"&equalTo="${firebaseKey}"`)
    .then((response) => {
      const boardDinns = response.data;
      const dinns = [];
      if (boardDinns) {
        Object.keys(boardDinns).forEach((dinnId) => {
          dinns.push(boardDinns[dinnId]);
        });
      }
      resolve(dinns);
    })
    .catch((error) => reject(error));
});

const getSingleDinn = (dinnFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Dinns/${dinnFirebaseKey}.json`).then((response) => {
    const thisDinn = response.data;
    resolve(thisDinn);
  }).catch((error) => reject(error));
});

const deleteDinn = (firebaseKey) => axios.delete(`${baseUrl}/Dinns/${firebaseKey}.json`);

const addDinn = (data) => axios.post(`${baseUrl}/Dinns.json`, data)
  .then((response) => {
    const update = { firebaseKey: response.data.name };
    axios.patch(`${baseUrl}/Dinns/${response.data.name}.json`, update);
  }).catch((error) => console.warn(error));

export default {
  getDinns, getboardDinns, getSingleDinn, deleteDinn, addDinn
};
