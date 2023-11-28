const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const all_categories = await Category.findAll({
      include: [{ model: Product }],
    });
    // console.log(categories);
    res.status(200).json(all_categories);
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
 try{
  const categroyId = await Category.findByPk(req.params.id, {include: Product});

if(!categroyId) {
  res.status(404).json({message: 'No category found with that id!'});
  return;
}
res.status(200).json(categroyId);
  } catch (err) {
    res.status(500).json(err);
  }
});
// create a new category
router.post('/', async (req, res) => {
  try {
    //use create method to create a new category
    const newcategoryData = await Category.create(req.body);
    res.status(200).json(newcategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatecategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    if (!updatecategory[0]) {
      res.status(404).json({ message: 'No category with this id to update!' });
      return;
    }
    res.status(200).json(updatecategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    //holds category we want to delete by id
    const deleteCategory = await Category.destroy( {
      where: {
        id: req.params.id
      },
    });
    //if there is no category with this id to delete display message
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category with this id to delete!' });
      return;
    }// if there is a category with that id, then delete it by calling our variable
    res.status(200).json(deleteCategory, {message: 'Category Deleted!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
