const User = require('../models/User');
const Post = require('../models/Post');

const postControllers = {
  async create(req, res) {
    try {
      const { userId, content } = req.body;

      const post = await Post.create({ userId, content });

      const newPost = await User.findByIdAndUpdate(userId, { $push: { posts: post._id } });

      res.status(201).send({ message: `Post created:\n ${newPost}` });
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: 'Create post fail!', error });
    }
  },

  async read(req, res) {
    try {
      const posts = await Post.find({});

      res.status(200).send({ posts });
      
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: 'Create post fail!', error });
    }
  }
}

module.exports = postControllers;