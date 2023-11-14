const Comment = require("../models/commentModel");

exports.listAllComments = async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.find({ post_id: postId });
        res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

exports.createAComment = async (req, res) => {
    const newComment = new Comment({
        ...req.body,
        post_id: req.params.postId
    });
    try {
        const comment = await newComment.save();
        res.status(201).json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};


exports.deleteComment = async (req, res) => {
try {
    const result = await Comment.deleteOne({ _id: req.params.commentId });
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


exports.updateComment = async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            req.body,
            { new: true } 
        );

        if (!updatedComment) {
            res.status(404).json({ message: "Commentaire non trouvé" });
        } else {
            res.status(200).json(updatedComment);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};


exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: "Commentaire non trouvé" });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
    }
};


