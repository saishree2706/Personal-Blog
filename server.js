const express = require('express');
const articleRouter = require('./routes/articles');
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override');



mongoose.connect('mongodb://localhost/blog', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}).then(() => {
    console.log('connection successful')
}).catch((error) => {
    console.log('connection refused')
})



const app = express();
app.use(express.urlencoded({ extended: false}));

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));




app.get('/', async(req,res)=>{
	const articles = await Article.find().sort({
		createdAt: 'desc'
	});
	res.render("articles/index", {articles: articles});
})

app.use('/articles', articleRouter);


app.listen(5000);
console.log("On port 5000");