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
  const id_categories = await Category.findByPk({
    include: Product
  })
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    //use create method to create a new category
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatecategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatecategory[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
