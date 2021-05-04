const express = require('express')
const app = express()

app.use(require('morgan')('tiny'))
const routesReport = require('rowdy-logger').begin(app)

app.use(express.json())
app.use(require('cors')())


const userRoutes = require('./routes/userRoutes')
app.use('/users', userRoutes)

const friendRoutes = require('./routes/friendRoutes')
app.use('/friend', friendRoutes)

const chatRoutes = require('./routes/chatRoutes')
app.use('/chat', chatRoutes)




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
  routesReport.print()
})