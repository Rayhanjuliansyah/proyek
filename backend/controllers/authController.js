const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, +process.env.BCRYPT_SALT);

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                error: 'Email is already registered'
            });
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: 'Email and password are required'
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        const token = jwt.sign({
            id: user.id,
            name: user.name,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '1d' });


        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            data: {
                name: user.name,
                email: user.email,
                role: user.role,
                token: token
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


module.exports = { register, login };
