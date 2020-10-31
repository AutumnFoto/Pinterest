import dinnData from '../../helpers/data/dinnsData';
import boardData from '../../helpers/data/boardData';

const updateDinnForm = (dinnObject) => {
  $('#update-dinn-form').html(
    `<h2>Update Dinn</h2>
            <div id="success-message"></div>
            <form>
              <div id="error-message"></div>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="dinn-name" value="${dinnObject.name}" placeholder="Example: Delicious Pasta">
              </div>
              <div class="form-group">
                <label for="image">Image</label>
                <input type="text" class="form-control" id="dinn-image" value="${dinnObject.image}" placeholder="Example: http://www.google.jpg">
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="form-control" id="dinn-description" value="${dinnObject.description}" placeholder="Example: A very delicious pasta">
              </div>
              <div class="form-group">
                <label for="link">Link</label>
                <input type="text" class="form-control" id="dinn-link" value="${dinnObject.link}" placeholder="Example: http://www.google.com">
              </div>
              <div class="form-group">
            <label for="dinn-board">Board</label>
              <select class="form-control" id="dinn-board">
                <option value="">Select a Board</option>
              </select>
          </div>
              <button id="update-dinn-btn" type="submit" class="btn btn-info"><i class="fas fa-plus-circle"></i> Update Dinn</button>
            </form>`
  );

  boardData.getBoards().then((response) => {
    response.forEach((item) => {
      $('select').append(`<option value="${item.firebaseKey}" ${dinnObject.boardId === item.firebaseKey ? "selected='selected'" : ''}>${item.name}</option>`);
    });
  });

  $('#update-dinn-btn').on('click', (e) => {
    e.preventDefault();

    const data = {
      name: $('#dinn-name').val() || false,
      image: $('#dinn-image').val() || false,
      description: $('#dinn-description').val() || false,
      link: $('#dinn-link').val() || false,
      boardId: $('#dinn-board').val() || false
    };

    if (Object.values(data).includes(false)) {
      $('#error-message').html('<div class="alert alert-danger" role="alert">Please complete all fields</div>');
    } else {
      $('#error-message').html('');
      dinnData.updateDinn(dinnObject.firebaseKey, data)
        .then(() => {
          $('#success-message').html('<div class="alert alert-success" role="alert">Your Dinn Was Updated!</div>');
        }).catch((error) => console.warn(error));

      setTimeout(() => {
        $('#success-message').html('');
      }, 3000);
    }
  });
};

export default { updateDinnForm };
