const express=require('express')
const Profile=require('../../models/Profile')
const router=express.Router()
const Posts=require('../../models/Posts')
const mongoose=require('mongoose')
const passport=require('passport')

const validPostInput=require('../../validators/post')
router.get('/test',(req,res)=>res.json({msg:'posts works'}))


router.get('/',(req,res)=>{
    Posts.find()
    .sort({date:-1})
    .then(post=>res.json(post))
    .catch(err=>res.status(404))
})

router.get('/:id',(req,res)=>{
    Posts.findById(req.params.id)
    .then(post=>res.json(post))
    .catch(err=>res.status(404).json({nopostsfound:"No post found with that 10"}))
})

router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const{errors,isValid}=validPostInput(req.body)
    if(!isValid)
    {
        return res.status(400).json(errors)
    }
    const newPost=new Posts({
        text:req.body.text,
        name:req.body.name,
        avatar:req.body.avatar,
        user:req.user.id
    })
    newPost.save().then(post=>res.json(post))
})

router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
 Profile.findOne({user:req.user.id})
 .then(profile=>{
     Posts.findById(req.params.id)
     .then(post=>{
         if(post.user.toString()!==req.user.id)
         {
             return res.status(401).json({notauthorized:"User not authorized"})
         }
         post.remove().then(()=>res.json({success:true}))
     })
     .catch(err=>res.status(404).json({postnotfound:'No post found'}))
 })
   
})


router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        Posts.findById(req.params.id)
        .then(post=>{
            if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0)
            {
               return  res.status(400).json({alreadyLiked:'User already liked this post'})
            }
            post.likes.unshift({user:req.user.id})
            post.save().then(post=>res.json(post))
        })
        .catch(err=>res.status(404).json({postnotfound:'No post found'}))
    })
      
   })
   
   router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        Posts.findById(req.params.id)
        .then(post=>{
            if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0)
            {
               return  res.status(400).json({notliked:'You have not liked'})
            }
          const removeIndex=post.likes
          .map(item=>item.user.toString())
          .indexOf(req.user.id)
          post.likes.splice(removeIndex,1)
          post.save().then(post=>res.json(post))
        })
        .catch(err=>res.status(404).json({postnotfound:'No post found'}))
    })
      
   })

   router.post('/comment/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const{errors,isValid}=validPostInput(req.body)
    if(!isValid)
    {
        return res.status(400).json(errors)
    }
       Posts.findById(req.params.id)
       .then(post=>{
           const newComment={
               text:req.body.text,
               name:req.body.name,
               avatar:req.body.avatar,
               user:req.body.user
           }
           post.comments.unshift(newComment)
           post.save().then(post=>res.json(post))
       })
       .catch(err=>res.status(404).json({postnotfound:'No post found'}))
   })
   
   router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
       Posts.findById(req.params.id)
       .then(post=>{
       if(post.comments.filter(comment=>comment._id.toString() === req.params.comment_id).length===0)
       {
           return res.status(404).json({commentnotexists:'Comment does not exist'})
       }
       const removeIndex=post.comments
       .map(item=>item._id.toString())
       .indexOf(req.params.comment_id)
       post.comments.splice(removeIndex,1)
       post.save().then(post=>res.json(post))
       })
       .catch(err=>res.status(404).json({postnotfound:' No post found'}))
   })

module.exports=router