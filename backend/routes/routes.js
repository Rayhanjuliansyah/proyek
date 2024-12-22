const routes = require('express').Router();
const { restrict } = require('../middleware/jwt');

const {
    register,
    login,
} = require('../controllers/authController');

const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const {
    getAllUstads,
    getUstadById,
    createUstad,
    updateUstad,
    deleteUstad,
    activeUstad,
} = require('../controllers/ustadController');

const {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
} = require('../controllers/bookingController');


routes.get('/', (req, res) => {
    res.json({ status: 'ok' });
});

routes.post('/register', register);
routes.post('/login', login);

routes.get('/users', getAllUsers);
routes.get('/users/:id', getUserById);
routes.put('/users/:id', updateUser);
routes.delete('/users/:id', deleteUser);

routes.get('/ustads', getAllUstads);
routes.get('/ustads/:id', getUstadById);
routes.post('/ustads', createUstad);
routes.put('/ustads/:id', updateUstad);
routes.delete('/ustads/:id', deleteUstad);
routes.put('/ustads/:id/status', activeUstad);

routes.get('/bookings', getAllBookings);
routes.get('/bookings/:id', getBookingById);
routes.post('/bookings', createBooking);
routes.put('/bookings/:id', updateBooking);
routes.delete('/bookings/:id', deleteBooking);



module.exports = routes