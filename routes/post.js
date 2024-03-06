const express = require('express');
const authentificate = require('../middleware/authentificate')
const router = express.Router();
const Post = require('../models/post');

// create new post avec middleware
router.post('/create',authentificate, async (req, res) => {
    try{
        const { title, description } = req.body;//distructor
        const post = new Post({title,description,author:req.userId});
        await post.save();
        res.status(201).send('Post created successfulyy');
    }catch(error){
        res.status(400).send(error.message); 
    }
  });

  //getall
  //populate: yrajaali l'objet avec le ref de la partie user, => ken 3mlt find akahw yrajaali title w desc 
  router.get('/', async(req,res)=>{
    try{const posts = await Post.find().populate('author','username')
    res.send(posts)
  }catch(error){
    res.status(500).send('server error')
  }
  })

  //modif
  router.put('/:id', authentificate, async(req,res)=>{
    try{
      const {id} = req.params;
      const{title,description} = req.body;
      const updatedPost = await Post.findByIdAndUpdate(id,{title,description},{new:true})
      res.send(updatedPost)
    }catch(error){
      res.send(400).send(error.message)
    }
  })

  //delete
  // router.delete('/:id', authentificate, async(req,res)=>{
  //   try{
  //     const {id} = req.params;
  //     const{title,description} = req.body;
  //     const updatedPost = await Post.findByIdAndUpdate(id,{title,description},{new:true})
  //     res.send(updatedPost)

  //   }catch(error){
  //     res.send(400).send(error.message)
  //   }
  // })

// // Create a new post
// router.post('/add', async (req, res) => {
//     try{
//         const { title, description } = req.body;//distructor
//     if (!title || !description) {
//       return res.status(400).send('Missing title or description');
//     }
//     const newPost = new Post({ title, description });
//     console.log('new post added',newPost)
//     await newPost.save();
//     res.status(201).send(newPost);
//     }catch(error){
//         console.log('no');
//         res.status(400).send(error.message); 
//     }
//   });
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



  // //getall
  // router.get('/getAll', async (req,res)=>{
  //   try{
  //     posts = await Post.find();
  //     res.send(posts);

  //   }catch(error){
  //     res.send(error)
  //   }
  // })

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

