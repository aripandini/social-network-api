const { User, Thought } = require('../models');

module.exports = {

     // Get all Thoughts
     async getThoughts(req,res) {
        try {
            const thoughts = await Thought.find()
            .populate({
                path: 'reactions',
                select: '-__v'
              })
              .select('-__v')

            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Get single Thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId})
            .populate({
                path: 'reactions',
                select: '-__v'
              })
              .select('-__v')

            if(!thought) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
           res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Create a new Thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const createThought = await User.findOneAndUpdate({_id: req.body.userId},
                { $push: { thoughts: thought._id }})
            res.json(createThought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Update User
    async updateThought(req, res) {
        try {
            const updateThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, 
                req.body, 
                { new: true,
                    //  runValidators: true 
                    });
            res.json(updateThought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        } 
    },
    // Delete Thought 
    async deleteThought(req, res) {
        try {
            const deleteThought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
            res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        } 
    },
    // Add a reaction to Thought
    async addReaction(req, res) {
    try {
      const addReaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true,
            // runValidators: true 
        });
      res.json(addReaction);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
  },
    // Remove a reaction from Thought
    async deleteReaction(req, res) {
        try {
        const deleteReaction = await User.findOneAndUpdate(
            {  _id: req.params.thoughtId },
            { $pull: { reactions: req.params.thoughtId } },
            { new: true }
        );
        res.json(deleteReaction);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
 
};
