const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
const { render } = require('ejs');

// express app
const app = express();

mongoose.set('strictQuery', true)

// connect to mongodb
const dbURI  = 'mongodb+srv://owolewa:Efiamotu-1@net-blog-app.pbz0zbv.mongodb.net/node-blog-app?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then((result) => app.listen(3001))
.catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   console.log('new request made:');
//   console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   next();
// });

// app.use((req, res, next) => {
//   console.log('in the next middleware');
//   next();
// });

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title : 'secondary blog',
//     snippet : 'about my secondary blog',
//     body : 'more about my secondary blog'
//   })
//   blog.save()
//   .then((result) => {
//     res.send(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// })

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//   .then((result) => {
//     res.send(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// })

// app.get('/single-blog', (req, res) => {
//   Blog.findById('639735a8deb19fc0e3f969e3')
//   .then((result) => {
//     res.send(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// })

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs')
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// redirects

app.get('/about-us', (req, res) => {
    res.redirect('/about')
}) 

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
