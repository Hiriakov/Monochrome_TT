const Koa = require('koa');
const mongoose = require('mongoose');
const koaBody = require('koa-body');
const Pug = require('koa-pug');
const app = new Koa();
const router = require('./routers/routes');
const uri = require('./database/connect');
const errorHandler = require('./utils/errorHandler');

app.use(koaBody());
app.use(errorHandler);

const pug = new Pug({
    viewPath: './views',
    basedir: './views',
    app: app
 });

mongoose.Promise = global.Promise;
mongoose.connect(uri.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.use(router.routes())

app.listen(3000, () => console.log('Worker started!'));