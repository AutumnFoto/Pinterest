import form from '../forms/boardForm';

const addBoardView = () => {
  $('#app').html('');
  $('#add-dinn').html('');
  $('#app').html('<div id= "board-form"> put board form here</div>');
  form.boardForm();
};

export default { addBoardView };
