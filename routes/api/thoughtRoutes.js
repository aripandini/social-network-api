const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,

} = require('../../controllers/thoughtController.js');

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:ThoughtId
router.route('/:ThoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reaction
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reaction/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);


module.exports = router;
