const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        // Utilizado para retornar o json com a relação completa do spot/user
        await booking.populate('spot').populate('user').execPopulate();

        // req.connectedUsers está disponível em toda aplicação devido a adição do middleware em server.js
        const ownerSocket = req.connectedUsers[booking.spot.user];

        if (ownerSocket) {
            /* req.io está disponível em toda aplicação devido a adição do middleware em server.js
               como quero alertar apenas a quem pertence o spot, utilizasse a função to() passando o usuário
               conectado sendo assim é possível utilizar o emit('message', valor) para passar a mensagem
            */
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
}