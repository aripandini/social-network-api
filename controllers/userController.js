const { User, Thought } = require('../models');

module.exports = {

    // Get all Users
    async getUsers(req,res) {
        try {
            const users = await User.find()
            .populate({
                path: 'thoughts',
                select: '-__v'
              })
              .select('-__v')
              .sort({ _id: -1 })

            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Get single User
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.UserId})
            .populate({
                path: 'thoughts',
                select: '-__v'
              })
              .select('-__v')

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
           res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Create a new User 
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Update User
    async updateUser(req, res) {
        try {
            const updateUser = await User.findOneAndUpdate({ _id: req.params.UserId }, 
                req.body, 
                { new: true, runValidators: true });
            res.json(updateUser);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        } 
    },
    // Delete User 
    async deleteUser(req, res) {
        try {
            const deleteUser = await User.findOneAndRemove({ _id: req.params.UserId });
            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        } 
    },
    // Add a friend to User
    async addFriend(req, res) {
    try {
      const addFriend = await User.findOneAndUpdate({ _id: req.params.UserId },
        { $push: { friends: req.params.friendId } },
        { new: true,runValidators: true });
      
      res.json(addFriend);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
  },
    // Remove a friend from User
    async removeFriend(req, res) {
        try {
        const removeFriend = await User.findOneAndUpdate(
            {  _id: req.params.UserId },
            { $pull: { friends: req.params.friendId } },
            { new: true })

        res.json(removeFriend);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
};
