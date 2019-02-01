const getProfile = knex => (req, res) => {
    const { id } = req.params;
    console.log(id);
    knex.select('*').from('users').where({id})
    .then(user => {
        if (user.length) {
            res.json(user[0]);
        }
        res.json("Not Found")
    })
    .catch(error => res.json("Error!"))
}

module.exports = {
    getProfile
}