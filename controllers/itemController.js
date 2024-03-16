import Item from "../models/item.model.js";

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    console.log(items);
    res.json(items);
  } catch (err) {
    res.json({ message: err });
  }
};

export const createItem = async (req, res) => {
  const { name, size, category, subCategory, tags, images, price } = req.body;

  const item = new Item({
    name,
    size,
    category,
    subCategory,
    tags,
    images,
    price,
  });

  item
    .save()
    .then(async () => {
      const createdItem = await Item.findOne({ name });
      console.log(createItem);
      res
        .status(201)
        .send(
          `Item Created Successfully : INFO : Item ID : ${createdItem._id}`
        );
    })
    .catch((err) => {
      res.status(500).send(`User creation failed : ERROR : ${err}`);
    });
};

export const updateItem = async (req, res) => {
  try {
    const { name, size, category, subCategory, tags, images, price } = req.body;
    const id = req.params.id;
    console.log(id);

    const filter = { _id: id };
    const update = { name, size, category, subCategory, tags, images, price };
    console.log(update)

    let doc = await Item.findOneAndUpdate(filter, update);
    console.log(doc);

    doc = await Item.findOne(filter);
    console.log(doc);
    console.log("Finalizing ")

    res.json(doc);
  } catch {
    (err) => {
      console.log(err);
      res.status(500).send("Failed");
    };
  }
};

export const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    let doc = await Item.findOneAndDelete({ _id: id });
    console.log(doc);
    res.status(200).send("Delete succesful!");
  } catch {
    (err) => {
      res.status(500).json({ message: err });
    };
  }
};
