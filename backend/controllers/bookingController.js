const { PrismaClient } = require('@prisma/client');
const { parse } = require('dotenv');
const prisma = new PrismaClient();

const getAllBookings = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany();
        res.status(200).json({
            status: 'success',
            message: 'Bookings retrieved successfully',
            data: bookings
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getBookingById = async (req, res) => {
    const bookingId = req.params.id;
    try {
        const booking = await prisma.booking.findUnique({
            where: {
                id: parseInt(bookingId),
            }
        });
        res.status(200).json({
            status: 'success',
            message: 'Booking retrieved successfully',
            data: booking
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createBooking = async (req, res) => {
    const { userId, ustadId, duration, eventDate, location, price } = req.body;
    try {
        const booking = await prisma.booking.create({
            data: {
                userId: parseInt(userId),
                ustadId: parseInt(ustadId),
                bookingDate: new Date(),
                eventDate: eventDate,
                duration: duration,
                location: location,
                price: price
            }
        });
        res.status(201).json({
            status: 'success',
            message: 'Booking created successfully',
            data: booking
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getAllBookings
};