import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';
import React from 'react';

const handler = nc();

handler.put(async (req, res) => {
  const id = req.query["id"];
  await db.connect();
  const user = await User.findOne({ _id: id });
  user.password = req.body.password
    ? bcrypt.hashSync(req.body.password)
    : user.password;
  await user.save();
  await db.disconnect();
  const token = signToken(user);
  res.status(200).send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});


export default handler;
