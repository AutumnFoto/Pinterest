import form from '../forms/dinnForm';

const addDinnView = () => {
  $('#app').html('');
  $('#app').html('<div id = "dinn-form">Put dinn form here</div>');
  form.dinnForm();
};

export default { addDinnView };
