const express = require('express');
const router = express.Router();
const Post = require('../models/post');
// Create a new post
router.post('/add', async (req, res) => {
    try{
        const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).send('Missing title or description');
    }
  
    const newPost = new Post({ title, description });

    console.log('new post added',newPost)
    await newPost.save();
    res.status(201).send(newPost);

    }catch(error){
        console.log('no');
        res.status(400).send(error.message); 
    }
  });
// router.post('/create', async (req, res) => {
//     try{
//       data = req.body;
//       post = new Post(data);
//       savedPost = await this.post.save();
//       res.send(savedPost)
//     }catch(error){
//         res.status(400).send(error.message); 
//     }
//   });



  //getall
  router.get('/getAll', async (req,res)=>{
    try{
      posts = await Post.find();
      res.send(posts);

    }catch(error){
      res.send(error)
    }
  })

  // router.put('/update/:id', async(req, res) => {
  //   try{
  //       const post =await  Post.findById(req.params.id);
  //   if (!post) {
  //     return res.status(404).send('Post not found');
  //   }
  
  //   const { title, description } = req.body;
  //   post.title = title || post.title;
  //   post.description = description || post.description;
  //   await post.save();
  //   res.send(post);

  //   }catch(error){
  //       res.status(400).send(error.message);

  //   }
  // });

 module.exports= router;

