const routes = require('express').Router();
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const {
    register,
} = require('../controllers/authController');


routes.get('/', (req, res) => {
    res.json({ status: 'ok' });
});

routes.get('/users', getAllUsers);
routes.get('/users/:id', getUserById);
routes.put('/users/:id', updateUser);
routes.delete('/users/:id', deleteUser);

routes.post('/register', register);



module.exports = routes