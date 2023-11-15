const Post = require("../models/postModel");
const textprovider = require("../provider/testApiProvider");

exports.listAllPosts = async(req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200);
        res.json(posts);

    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." })
    }
}

exports.createAPost = async (req, res) => {
    try {
        // Valider les données de la requête ici si nécessaire

        const newPost = new Post(req.body);

        // Utiliser directement await pour obtenir le texte aléatoire
        if (!newPost.content) {
            newPost.content = await textprovider.getRandomText();
        }

        const post = await newPost.save();
        
        // Renvoyer une réponse de succès avec le post créé
        res.status(201).json(post);
    } catch (error) {
        // Gérer les erreurs survenues lors de la création du post
        res.status(500).send({ message: 'Error creating post' });
    }

}

exports.deletePost = async (req, res) => {
    try {
        const result = await Post.deleteOne({ _id: req.params.postId });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Post non trouvé" });
        } else {
            res.status(200).json({ message: "Post supprimé avec succès" });
        }
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            req.body,
            { new: true } 
        );

        if (!updatedPost) {
            res.status(404).json({ message: "Post non trouvé" });
        } else {
            res.status(200).json(updatedPost);
        }
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post non trouvé" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
    }
};


