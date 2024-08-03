const User = require('../models/User');

const userControllers = {
  async create(req, res){
    try {
      const { name, email, password } = req.body;

      if(!name || !email || !password) {
        return res.status(400).send(`Check infos and try again!`);
      }

      const user = await User.create({ name, email, password });
      const userCreated = user.toObject();
      delete userCreated.password

      res.status(201).send({ message: `User created!`, userCreated});

    } catch (error) {
      res.status(400).send({ message: `Created user fail!`, error });
    }
  },

  async read(req, res) {
    try {
      const users = await User.find({}, "-password").populate("posts");
      console.log(users);
      res.status(200).send({ users });
    } catch (error) {
      res.status(400).send({ message: `List users fail!`, error });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const userExist = await User.findById(id);

      if(!userExist){
        res.status(400).send({ message: 'User not found!'});
      }

      const { name, password } = req.body;
      const user = await User.findByIdAndUpdate(id, { name, password }, { new: true});
      const userUpdated = user.toObject();
      delete userUpdated.password;

      res.status(200).send({ userUpdated });
    } catch (error) {
      res.status(400).send({ message: `Update user fail!`, error });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const userExist = await User.findById(id);

      if(!userExist) {
        res.status(400).send({ message: `User not found!` });
      }

      await User.findByIdAndDelete(id);
      
      res.status(200).send({ message: 'User removed!' });
    } catch (error) {
      res.status(400).send({ message: `Delete user fail!`, error });
    }
  },

  async listSpecificUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id).populate("posts");

      if(!user) {
        res.status(400).send({ message: `User not found!` });
      }

      res.status(200).send({ user });
      
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: `List specific user fail!`, error });
    }
  }
}

module.exports = userControllers;