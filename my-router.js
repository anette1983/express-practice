// За допомогою класу express.Router можна створювати модульні, монтовані обробники маршрутів. Екземпляр Router є комплексною системою проміжних обробників та маршрутизації;
const express = require("express");
const router = express.Router();

// визначимо домашній роутер
router.get("/", (req, res) => {
  res.send("Це головний роутер");
});

// визначимо роутер about
router.get("/about", (req, res) => {
  res.send("About");
});

module.exports = router;

// Потім підключимо модуль my-router.js маршрутизації у додаток:

// const myRouter= require('./my-router');
// ...
// app.use('/my-router', myRouter);

// Цей додаток тепер зможе обробляти запити, адресовані ресурсам /my-router та /my-router/about.

