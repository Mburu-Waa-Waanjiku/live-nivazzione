import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';
import { signToken, isAuth } from '../../../utils/auth';
import React from 'react';
import jwt from 'jsonwebtoken';

const handler = nc();

handler.post(async (req, res) => {
  const email = req.body.email;
  await db.connect();
    const user = await User.findOne({ email: req.body.email });
  await db.disconnect();
  if (!user) {
      res.status(401).send({ message: 'Invalid email' });
    }else {
    const token = signToken(user);
    const link = `http://www.shiglam.com/reset-password/${user._id}/${token}`;
    const nodemailer = require('nodemailer')
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "shiglammailservice@gmail.com",
          pass: "mlganlkkmobzvztm",
        },
      });
      const mailOptions = {
        from: "SHIGLAM",
        to: email,
        subject: "Password Reset From SHIGLAM",
        text: link
      };
      
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.status(200).send({ message: 'sent' });
  }
});

export default handler;
