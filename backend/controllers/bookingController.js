const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllBookings = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                user: true,
                ustad: true,
            }
        });
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
            },
            include: {
                user: true,
                ustad: true
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

const getBookingByuserId = async (req, res) => {
    const userId = req.params.id;
    try {
        console.log(parseInt(userId))
        const booking = await prisma.booking.findMany({
            where: {
                userId: parseInt(userId),
            },
            include: {
                user: true,
                ustad: true
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
}

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

const updateBooking = async (req, res) => {
    const bookingId = req.params.id;
    const fieldsToUpdate = req.body;

    try {
        // Filter hanya field yang valid untuk update
        const validFields = ['userId', 'ustadId', 'duration', 'eventDate', 'location', 'price', 'status'];
        const dataToUpdate = {};

        validFields.forEach((field) => {
            if (fieldsToUpdate[field] !== undefined) {
                dataToUpdate[field] =
                    field === 'userId' || field === 'ustadId'
                        ? parseInt(fieldsToUpdate[field])
                        : fieldsToUpdate[field];
            }
        });

        // Jika tidak ada field yang valid, kirimkan response
        if (Object.keys(dataToUpdate).length === 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'No valid fields provided for update',
            });
        }

        const booking = await prisma.booking.update({
            where: {
                id: parseInt(bookingId),
            },
            data: dataToUpdate,
        });

        res.status(200).json({
            status: 'success',
            message: 'Booking updated successfully',
            data: booking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteBooking = async (req, res) => {
    const bookingId = req.params.id;
    try {
        const booking = await prisma.booking.delete({
            where: {
                id: parseInt(bookingId),
            }
        });

        res.status(200).json({
            status: 'success',
            message: 'Booking deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
    getBookingByuserId
};