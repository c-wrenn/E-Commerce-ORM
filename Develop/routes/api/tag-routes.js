const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// `/api/tags` 

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    // finds all tags and include the product according to the tag id
    const tags = await Tag.findAll({
      include: [{
        model:Product, through: ProductTag
      }]
  });
  res.status(200).json(tags);
} catch (err) {
  console.error(err);
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    // gets all tags by the primary key
    const allTags = await Tag.findByPk(req.params.id, {
      include: [{
        //includes product data
        model:Product,
        through: ProductTag
      }]
    });
    // if the tag id is not found, inform the user
    if(!allTags){
      res.status(404).json({message: "No Tag with that id"});
      return;
    }

    res.status(200).json(allTags);
  }catch (err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag by using post route
  try {
    const newCreatedTag = await Tag.create(req.body);
    res.status(200).json(newCreatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagName = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updateTagName[0] === 0) {
      res.status(404).json({ message: 'Cannot find a Tag with that id' });
      return;
    }
    res.status(200).json({ message: 'Tag name has been updated' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteAtag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    //if there is not an id match in the database, then inform user
    if (!deleteAtag) {
      res.status(404).json({ message: 'No Tag found with that id! ' });
      return;
    }
    res.status(200).json({ message: 'Tag deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
