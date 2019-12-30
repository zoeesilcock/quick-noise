const Router = require('express').Router;

const PlayerController = require('../controllers/player.controller');

const router = new Router();

router.route('/player/:id').get(PlayerController.getPlayer);
router.route('/player/:id/remotecode').get(PlayerController.getNewRemoteCode);
router.route('/player/connect/:code').get(PlayerController.connectToPlayer);
router.route('/player').post(PlayerController.createPlayer);
router.route('/player').put(PlayerController.updatePlayer);

module.exports = router;
