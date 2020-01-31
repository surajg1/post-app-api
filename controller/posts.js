const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');

exports.createPost =  (req,res,next)=>{
    const url = req.protocol + '://' + req.get("host");
    const post = new Post({
        title : req.body.title,
        content : req.body.content,
        imagePath : url + "/images/" + req.file.filename,
        creator : req.userData.userId
        });
    post.save().then(CreatedPost => {
        res.status(201).json({
            message : 'Post added successfully!',
            postId: {
                ...CreatedPost,
                id : CreatedPost._id
            }
        })    
    }).catch(error => {
        res.status(500).json({
            message : "Post creation Faild!"
        })
    });
    // posts.push(post.value);
    console.log(post);
   
}

exports.updatePost =  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if(req.file){
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
        _id: req.body.id,
        title : req.body.title,
        content : req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
    });
    console.log(post);
    Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result => {
       if(result.n > 0){
           res.status(200).json({message: "Updated Suceesfully"});  
       }else{
           res.status(401).json({ message:" You Does not create those post" })
       }
    }).catch(error =>{
        res.status(500).json({
            message : "Fails to Update a Post!!"
        })
    })
}

exports.getPost = (req,res,next)=>{
    
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;

    if(pageSize && currentPage){

        postQuery.skip(pageSize * (currentPage - 1))
                    .limit(pageSize);

    }

    postQuery.then(documents=>{
        fetchedPosts = documents;
        return Post.count();
    }).then(count => {
        res.status(200).json({
            message: "Posts fetched sucessfully!",
            posts: fetchedPosts,
            maxPosts:count
        });
    })
    .catch(error => {
        res.status(500).json({
            message : "Fails to Getting your a Post!!"
        })
    });
}

exports.getOnePost = (req,res,next)=>{
    Post.findById(req.params.id).then(post =>{
    if(post){
        res.status(200).json(post);
    }else{
        res.status(404).json({message : "Request does not found"});
    }

}).catch(error => {
    res.status(500).json({
        message : "Fails to Getting your a Post!!"
    })
});
}

exports.deletePost = (req,res,next) => {
    console.log(req.params.id);
    Post.deleteOne({_id : req.params.id, creator: req.userData.userId}).then(result => {
        if(result.n > 0){
            res.status(200).json({message: "Deleted Suceesfully"});  
        }else{
            res.status(401).json({ message:" You Does not create those post" })
        }    }) .catch(error => {
            res.status(500).json({
                message : "Fails to Deleting your a Post!!"
            })
        });
}