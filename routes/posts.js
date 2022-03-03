const router = require("express").Router();
const Post = require('../models/Post');
const User = require("../models/User");
// create post
router.post('/', async (req,res) => {
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost);
    }catch(err) {
        res.status(500).json("Failed to create new post.");
    }
});
// update post
router.put('/:id', async (req,res) => {
    try{
        // find the post by url id.
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({$set:req.body});
            res.status(200).json("Updated Sucessful.")
        }else{
            res.status(403).json("Failed to Update the post.")
        }
    }catch(err) {
        res.status(500).json(err);
    }
});
// delete post
router.delete('/:id', async (req,res) => {
    try{
        // find the post by url id.
        const post = await Post.findById(req.params.id);
        console.log(post.userId, req.body.userId)
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("Deleted Sucessful.")
        }else{
            res.status(403).json("Failed to Delete the post.")
        }
    }catch(err) {
        res.status(500).json(err);
    }
});

// like and dislike a post
router.put('/:id/like', async (req,res) => {
    try{
        // find the post by url id.
        const post = await Post.findById(req.params.id);
        // if current user liked the post before, then dislike.
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("Liked Sucessful.")
        }else{
            await post.updateOne({$pull: {likes: req.body.userId}})
            res.status(200).json("Disliked Sucessful.")
        }
    }catch(err) {
        res.status(500).json(err);
    }
});

// get a post
router.get('/:id', async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        // check if we can find the post.
        post ? res.status(200).json(post):res.status(403).json("Failed to get the post.")
    }catch(err) {
        res.status(500).json(err)
    }
});

// get timeline posts
router.get('/timeline/:userId', async (req, res) => {
    try{
        const currentUser = await User.findById(req.params.userId);
        // fetch all posts from current user.
        const userPosts = await Post.find({userId: currentUser._id});
        // fetch all posts from friends.
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId =>{
                return Post.find({userId: friendId});
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts))
        
    }catch(err) {
        res.status(500).json(err)
    }
});

// get all user posts
router.get('/profile/:username', async (req, res) => {
    try{
        const user = await User.findOne({username: req.params.username});
        // fetch all posts from current user.
        const posts = await Post.find({userId: user._id});
        res.status(200).json(posts)
    }catch(err) {
        res.status(500).json(err)
    }
});

module.exports = router;