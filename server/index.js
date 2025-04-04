import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import connection from './db.js'
import user from './routes/user.js'
import blog from './routes/blog.js'
import comment from './routes/comment.js'

const app = express()
dotenv.config()
const port = process.env.PORT || 8000

connection()
app.use(express.json())
app.use(cors({origin:'*'}))
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))

app.use('/check',(req,res)=>{
    res.send('server is working')
})

app.use('/user',user)
app.use('/blog',blog)
app.use('/comment',comment)

app.listen(port,()=>{
    console.log('server started at',port)
})