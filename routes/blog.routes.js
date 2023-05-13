const express = require("express");
const blogRouter = express.Router();
const { blogModel } = require("../model/blog.model");

blogRouter.get("/blogs", async (req, res) => {
  let { page, limit, title, category, sort, order } = req.query;
  limit = limit ? limit : 5;
  order = order === "asc" ? 1 : -1;
  let data = [];
  try {
    if (page) {
      const blogs = await blogModel
        .find()
        .limit(limit)
        .skip(page - 1 * limit);
      data = { ...data, blogs };
      console.log("yes");
    }
    if (title) {
      const blogs = await blogModel.find({ title });
      data = { ...data, blogs };
      console.log("yes2");
    }
    if (category) {
      const blogs = await blogModel.find({ category });
      data = { ...data, blogs };
      console.log("yes3");
    }
    if (sort) {
      const blogs = await blogModel.find().sort({ date: order });
      data = { ...data, blogs };
    }
    if (data.length === 0) {
      console.log("yes4");
      const blogs = await blogModel.find();

      res.status(200).send({ msg: "Success", data: blogs });
    }
    res.status(200).send({ msg: "Success", data: data });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

blogRouter.post("/blogs", async (req, res) => {
  try {
    let newBlog = new blogModel(req.body);
    newBlog.save();
    res.status(200).send({ msg: "Added new blog" });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

blogRouter.put("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await blogModel.findByIdAndUpdate(id, req.body);
    res.status(201).send({ msg: "Updated Successfully" });
  } catch (e) {
    res.status(400).send({ msg: "Something Went Wrong" });
  }
});

blogRouter.patch("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await blogModel.findByIdAndUpdate(id, req.body);
    res.status(201).send({ msg: "Updated Successfully" });
  } catch (e) {
    res.status(400).send({ msg: "Something Went Wrong" });
  }
});

blogRouter.delete("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await blogModel.findByIdAndDelete(id);
    res.status(201).send({ msg: "Deleted Successfully" });
  } catch (e) {
    res.status(400).send({ msg: "Something Went Wrong" });
  }
});

blogRouter.put("/blogs/:id/like", async (req, res) => {
  const id = req.params.id;
  try {
    await blogModel.findByIdAndUpdate(id, req.body);
    res.status(201).send({ msg: "Updated Successfully" });
  } catch (e) {
    res.status(400).send({ msg: "Something Went Wrong" });
  }
});

blogRouter.put("/blogs/:id/comment", async (req, res) => {
  const id = req.params.id;
  try {
    await blogModel.findByIdAndUpdate(id, req.body);
    res.status(201).send({ msg: "Updated Successfully" });
  } catch (e) {
    res.status(400).send({ msg: "Something Went Wrong" });
  }
});

module.exports = { blogRouter };
