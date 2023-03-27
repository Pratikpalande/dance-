const express = require("express")
const path = require("path")
const app = express()


const mongoose = require('mongoose');
const { MongooseError } = require('mongoose');
mongoose.connect('mongodb://localhost/27017/pratik', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

const port = 80;

const contactSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  date: String,
});

const Contact = mongoose.model('contact', contactSchema);

const contact = new Contact({ name: 'contact' });
contact.save();

app.use('/static',express.static('static'));
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
  const params = {}
  res.render('home.pug',params)
})

app.get('/contact',(req,res)=>{
  const params = {}
  res.render('contact.pug',params)
})

app.post('/contact', (req, res) => {
  const { name, address, phone, date } = req.body;
  const contact = new Contact({ name :'contact' });
  contact.save()
    .then(() => {
      res.send('This item has been saved to the database');
    })
    .catch(() => {
      res.status(400).send('Item was not saved to the database');
    });
});




app.listen(port,()=>{
  console.log(`THE APP STARTED SUCCESSFULLY ON PORT ${port}`);
}); 