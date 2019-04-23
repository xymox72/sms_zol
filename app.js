const express = require('express');
const app = express();

const SMSController = require("./controllers/SMSController");
const base =require("./controllers/IController");

const sms = new SMSController(app);

app.use(express.static('public'));

app.get('/list', async (req, res, next) =>{
   await sms.DeleteDup(req, res, next);
});
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
    <script src="/js/main.js"></script>
</body>
</html>`;

app.get('/', async(req, res, next) => res.send(html));

app.get('/1', async(req, res, next) => await sms.Send(req, res, next));

app.get('/2', async(req, res, next) => await sms.Excel(req, res, next));




