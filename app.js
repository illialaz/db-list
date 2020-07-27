const express = require(`express`)
const mongo = require('mongodb').MongoClient
const app = express()
let collection = null

const connectToMongo = () => {
  const url = 'mongodb://localhost:27017'

  mongo.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  }, (err, client) => {
    if(err) {
      console.log(err)
      return
    }

    console.log('Connection successful!')

    const db = client.db('dogs')

    collection = db.collection('dogsnames')

    
  })
}

connectToMongo()

app.set('view engine', 'pug')

app.use(express.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  collection.find().toArray((err, items) => {
    if(err) {
      console.log(err)
      return
    }
    res.render('form', { items })
  })
})

app.post('/dog', (req, res) => {
  const name = req.body.name
  collection.insertOne({ name }, (err, result) => {
    if(err) {
      console.log(err)
      return
    }

    console.log(result)
  })

  res.redirect('/')
  
})

app.listen(3000, () => {
  console.log('App is listening')
})


