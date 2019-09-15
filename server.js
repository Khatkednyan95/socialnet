const express=require('express')
const passport=require('passport')
const mongoose=require('mongoose')
const path=require('path')
const app=express()
const users=require('./routes/api/users')
const posts=require('./routes/api/posts')
const profile=require('./routes/api/profile')



const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server i running on the ${port}`)
})

app.use(express.json())
app.use('/api/users',users)
app.use('/api/posts',posts)
app.use('/api/profile',profile)

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))

    })
}

const db=require('./config/keys').MongoURI
mongoose
.connect(db,{
    useNewUrlParser:true,
    useFindAndModify:false,
    
})
.then(()=>console.log('mongodb connected'))
.catch(err=>console.log(err))


app.use(passport.initialize())
require('./config/passport')(passport)

app.use(express.json())
