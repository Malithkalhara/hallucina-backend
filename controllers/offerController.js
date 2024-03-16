import Offer from "../models/offer.model.js";

export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    console.log(offers);
    res.json(offers);
  } catch (err) {
    res.json({ message: err });
  }
};

export const createOffer = async (req, res) => {
  const { title, description, startDate, endDate, item } = req.body;

  const offer = new Offer({
    title,
    description,
    startDate,
    endDate,
    item
  });

  offer
    .save()
    .then(async () => {
      const createdOffer = await Offer.findOne({ title });
      console.log(createdOffer);
      res
        .status(201)
        .send(
          `Offer Created Successfully : INFO : Offer ID : ${createdOffer._id}`
        );
    })
    .catch((err) => {
      res.status(500).send(`User creation failed : ERROR : ${err}`);
    });
};

export const updateOffer = async (req, res) => {
  try {
    const { title, description, startDate, endDate, item } = req.body;
    const id = req.params.id;
    console.log(id);

    const filter = { _id: id };
    const update = { title, description, startDate, endDate, item };
    console.log(update)

    let doc = await Offer.findOneAndUpdate(filter, update);
    console.log(doc);

    doc = await Offer.findOne(filter);
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

export const deleteOffer = async (req, res) => {
  try {
    const id = req.params.id;
    let doc = await Offer.findOneAndDelete({ _id: id });
    console.log(doc);
    res.status(200).send("Delete succesful!");
  } catch {
    (err) => {
      res.status(500).json({ message: err });
    };
  }
};
