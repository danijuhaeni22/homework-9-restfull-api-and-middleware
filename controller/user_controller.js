const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static async getAll(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, name, password } = req.body;

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with the hashed password
      const newUser = await User.create({
        email,
        name,
        password: hashedPassword,
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "InvalidCredential" };
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw { name: "InvalidCredential" };
      }
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        "secret"
      );
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, password, email } = req.body;
      const updateUser = await User.update(
        { name, password, email },
        { where: { id } }
      );
      res.status(200).json({ message: "Update successful" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await User.destroy({ where: { id } });
      res.status(200).json({ message: "User delete successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
