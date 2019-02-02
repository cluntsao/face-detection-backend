const handleRegister = (knex, bcrypt) => (req, res) => {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(password, salt);
    knex.transaction(trx => {
        trx.insert({
            hash,
            email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            console.log(loginEmail);

            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name,
                joined: new Date()
            })
            .then(response => console.log(response))
            .then(res.json("success"))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json("unable to register"))
}

module.exports = {
    handleRegister
}