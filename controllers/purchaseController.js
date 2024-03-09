import Purchase from "../models/purchase.model.js";

export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find();
    console.log(purchases);
    res.json(purchases);
  } catch (err) {
    res.json({ message: err });
  }
};

export const createPurchase = async (req, res) => {
  const {date,amount,userId,items} = req.body;

  const purchase = new Purchase({
    date,amount,userId,items
  });

  purchase
    .save()
    .then(async (result) => {
      console.log(result)
      res
        .status(201)
        .send(
          `Purchase Created Successfully : INFO : Purchase ID : ${result._id} `
        );
    })
    .catch((err) => {
      res.status(500).send(`User creation failed : ERROR : ${err}`);
    });
};

export const updatePurchase = async (req, res) => {
  try {
    const { date,amount,userId,items } = req.body;
    const id = req.params.id;
    console.log(id);

    const filter = { _id: id };
    const update = { date,amount,userId,items };
    console.log(update)

    let doc = await Purchase.findOneAndUpdate(filter, update);
    console.log(doc);

    doc = await Purchase.findOne(filter);
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

export const deletePurchase = async (req, res) => {
  try {
    const id = req.params.id;
    let doc = await Purchase.findOneAndDelete({ _id: id });
    console.log(doc);
    res.status(200).send("Delete succesful!");
  } catch {
    (err) => {
      res.status(500).json({ message: err });
    };
  }
};
