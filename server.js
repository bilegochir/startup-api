const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const Champion = require('./server/champion')
const schema = require('./schema/schema')

const app = express()
app.use(cors())
const PORT = 4000

app.use('/graphql', graphqlHTTP({
    schema, graphiql: true
}))

app.get('/', (req, res) => {
    res.send('working')
})

app.listen(PORT, () => {
    console.log(`listening on: ${PORT}`)
})