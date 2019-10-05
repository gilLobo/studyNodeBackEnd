const User = require('../models/User');

module.exports = {
    // Métodos index, show, store, update, destroy
    async show(req, res) {
        var users = await User.find();

        if (!users) {
            return res.status(404).json({ error: 'Users not found'})
        }

        return res.json(users);
    },

    async findUserForEMail(req, res) {
        const { email } = req.query;
        var user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found'})
        }

        return res.json(user);
    },

    async store(req, res) {
        const { email } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email });
        }
        
        return res.json(user);
    }
};