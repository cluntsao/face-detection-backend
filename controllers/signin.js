const handleSignin = (knex, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    
    return knex.select('email', 'hash').from('login')
    .where("email", "=", email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0]['hash']);

        if (isValid) {
            return knex.select('*').from('users').where('email', '=', email)
                .then(user => {
                    res.json(Object.assign(user[0], {msg: "success"}))
                })
                .catch(err => res.status(400).json("unable to get user"))
        } else {
            return res.status(400).json("Not Correct")
        }
    })
    .catch(err => res.status(400).json("Wrong Credentials"))
    
}

module.exports = ({
    handleSignin
})