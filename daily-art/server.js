const express = require('express');
const path = require('path');
const { handleRootRequest } = require('./handlers');
const { getImageAndAudio } = require('./downloadHandler');
const { CronJob } = require('cron');

const job = new CronJob(
  '20 0 0 * * *',
  getImageAndAudio,
  null, //onComplete
  true, //start
);


const app = express();
const port = 1337;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', handleRootRequest);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
