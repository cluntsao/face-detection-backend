const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: process.env.API_KEY});

const handleImage = knex => (req, res) => {
    const { id } = req.body;

    knex("users").where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries))
    .catch(error => console.log(error))
}

const handleApiCall = () => (req, res) => {
    app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
        .then(generalModel => {
            console.log(req.body.imageUrl)
        return generalModel.predict(req.body.imageUrl);
        })
        .then(data => res.json(data))
        .catch(err => res.status(400).json("unable to work with api"))
}

module.exports = {
    handleImage,
    handleApiCall
}