module.exports = function(app) {
  const gameController = require('../controllers/gameController');

  app.route('/')
    .get(gameController.test);

  app.route('/game/:hash/board')
    .get(gameController.read_one_board);
    // .put(gameController.update_one_board);



  // app.route('/language/:langId')
  //  .get(langList.read_a_language)
  //  .put(langList.update_a_language)
  // .delete(langList.delete_a_language);
}
