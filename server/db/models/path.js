const Sequelize = require('sequelize');
const db = require('../db');
const GAME_OPTIONS = ['quiz', 'snake', 'hangman', 'flappy', 'sortfruits'];
const Path = db.define('path', {
  path_name: {
    type: Sequelize.STRING,
  },
  stage: {
    type: Sequelize.INTEGER,
  },
  game_type: {
    type: Sequelize.ENUM(...GAME_OPTIONS),
  },
});
// Path.addHook('afterCreate', async (path) => {
//   const gameIndex = (path.id - 1) % GAME_OPTIONS.length;
//   if (!path.game_type) {
//     path.game_type = GAME_OPTIONS[gameIndex];
//     await path.save();
//   }
// });
module.exports = Path;
