import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (error) {
    console.warn(error);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(6).exec();
    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (error) {
    console.warn(error);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" }
    )
      .populate("user")
      .exec()
      .then((doc, err) => {
        if (err) {
          console.warn(err);
          return res.status(500).json({
            message: "Не удалось получить статью",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Статья не найдена",
          });
        }

        res.json(doc);
      });
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Ошибка при загрузке статьи",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.warn(error);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete({ _id: postId }).then((doc, err) => {
      if (err) {
        console.warn(err);
        return res.status(500).json({
          message: "Не удалось удалить статью",
        });
      }

      if (!doc) {
        return res.status(404).json({
          message: "Статья не найдена",
        });
      }

      res.json({ success: true });
    });
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Ошибка при удалении статьи",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );

    const post = await doc._update;

    res.json(post);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Ошибка при обновлении статьи",
    });
  }
};
