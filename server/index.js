import express, {request, response} from 'express';
import sequelize from "./db.js";
import models from "./models/models.js";
import cors from 'cors';
import dotenv, {config} from 'dotenv';
import handlebars from "express-handlebars";
import bodyParser from 'body-parser'
config();
const PORT = process.env.PORT || 5000;






//const urlencodedParser = express.urlencoded({extended: false});
const app = express();
app.use(express.json());


app.use(cors());
app.use(express.urlencoded({ extended: true }))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));



// Подключаем основной роутер
import router from "./routes/index.js";


//------------------------
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', '../client/views');
//---------------------------





// Здесь подключаем общий роутер
//сменил с api на /
app.use('/', router);






// Слушаем порт сервера
//{force: false} true - для перезаписи БД
(async () => {
    await sequelize.sync({force: false}).then( () => [
        app.listen(PORT, function () {
            console.log(`Сервер ожидает подключения...${PORT}`);
            //console.log(path.resolve('static'))
        })
    ]);
})();









