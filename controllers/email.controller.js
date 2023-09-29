
const nodemailer = require('nodemailer');

const { response } = require('express');

const postEmail = async (req, res = response) => {

  const { email, reserva } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'jorgepruebatecnicafront@gmail.com',
      pass: 'ugox myyx bymd tvwf',
    },
  });

  try {
    const mailOptions = {
      from: 'jorgepruebatecnicafront@gmail.com',
      to: email,
      subject: 'Notificacion de reserva',
      text: reserva
    };

    await transporter.sendMail(mailOptions);


    res.json({
      ok: true,
      email,
      msg:'email enviado'
    });


  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en el post'
    });
  }
}

module.exports = {
  postEmail
}