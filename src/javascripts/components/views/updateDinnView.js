import dinnData from '../../helpers/data/dinnsData';
import form from '../forms/updateDinnForm';

const updateDinnView = (dinnFirebaseKey) => {
  $('#auth').html('');
  $('#app').html('<div id="update-dinn-form"></div>');
  dinnData.getSingleDinn(dinnFirebaseKey).then((response) => {
    form.updateDinnForm(response);
  });
};

export default { updateDinnView };
