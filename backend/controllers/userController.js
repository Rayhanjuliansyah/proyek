
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        res.status(200).json({
            status: 'success',
            message: 'Users retrieved successfully',
            data: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId),
            },
            include: {
                userProfile: true,
            },
        });

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'User retrieved successfully',
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, password, role } = req.body;
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                name,
                email,
                password,
                role
            }
        });
        res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                isActive: false
            }
        });

        const profile = await prisma.userProfile.update({
            where: { userId: userId },
            data: {
                isActive: false
            }
        })
        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};











module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};