// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect('mongodb://localhost:27017/blog');


const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
  });
  
  const Post = mongoose.model('Post', PostSchema);


app.use(bodyParser.json());


app.use(express.static('public'));


app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.get("/index",(req, res)=>{
    res.sendFile(__dirname + "/pages/index.html");

})


app.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content });
  await post.save();
  res.json(post);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
