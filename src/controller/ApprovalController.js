const Booking = require('../models/Booking');

module.exports = {
    async store(req, res){
        const { booking_id } = req.params;
        
        const booking = await Booking.findById(booking_id).populate('spot');

        booking.approved = true;

        await booking.save();

        const bookingUserSocket = req.connectedUsers[booking.user];

        if (bookingUserSocket) {
            /* req.io está disponível em toda aplicação devido a adição do middleware em server.js
               como quero alertar apenas a quem pertence o spot, utilizasse a função to() passando o usuário
               conectado sendo assim é possível utilizar o emit('message', valor) para passar a mensagem
            */
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }
        
        return res.json(booking);
    }
};