const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllUstads = async (req, res) => {
    try {
        const ustads = await prisma.ustad.findMany({
            include: {
                user: {
                    include:{
                        userProfile : true
                    }
                }
            }
        });
        res.status(200).json({
            status: 'success',
            message: 'Ustads retrieved successfully',
            data: ustads
        });

        if (!ustads) {
            return res.status(404).json({
                status: 'fail',
                message: 'Ustads not found'
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

const getUstadById = async (req, res) => {
    const ustadId = req.params.id;
    try {
        const ustad = await prisma.ustad.findUnique({
            where: {
                id: parseInt(ustadId),
            },
            include: {
                user: {
                    include: {
                        userProfile: true,
                    }
                }

            },
        });
        res.status(200).json({
            status: 'success',
            message: 'Ustad retrieved successfully',
            data: ustad
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

const createUstad = async (req, res) => {
    const { name, userId, hourlyRate, expertise, description,availability } = req.body;

    if (!userId || !hourlyRate || !expertise || !description) {
        return res.status(400).json({
            status: 'fail',
            message: 'All fields are required'
        });
    }

    try {

        const ustad = await prisma.ustad.create({
            data: {
                name: name,
                userId: parseInt(userId),
                hourlyRate: parseFloat(hourlyRate),
                expertise: expertise,
                description: description,
                availability:availability || false
            }
        });

        res.status(201).json({
            status: 'success',
            message: 'Ustad created successfully',
            data: ustad
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

const updateUstad = async (req, res) => {
    const ustadId = req.params.id;
    const { hourlyRate, expertise, description, availability } = req.body;

    if (!hourlyRate || !expertise || !description) {
        return res.status(400).json({
            status: 'fail',
            message: 'All fields are required'
        });
    }

    try {

        const ustad = await prisma.ustad.update({
            where: {
                id: parseInt(ustadId)
            },
            data: {
                hourlyRate: parseFloat(hourlyRate),
                expertise: expertise,
                description: description,
                availability:availability || false
            }
        });

        res.status(200).json({
            status: 'success',
            message: 'Ustad updated successfully',
            data: ustad
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const deleteUstad = async (req, res) => {
    const ustadId = req.params.id;

    try {

        const ustad = await prisma.ustad.delete({
            where: {
                id: parseInt(ustadId)
            }
        });

        res.status(200).json({
            status: 'success',
            message: 'Ustad deleted successfully',
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const activeUstad = async (req, res) => {
    const { ustadId, status } = req.params.id;

    try {
        let availability

        if (status === 'active') {
            availability = true
        } else if (status === 'inactive') {
            availability = false
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid status'
            });
        }

        const ustad = await prisma.ustad.update({
            where: {
                id: parseInt(ustadId)
            },
            data: {
                availability: availability,
            }
        });

        const userId = await prisma.ustad.findUnique({
            where: {
                id: parseInt(ustadId)
            },
            select: {
                userId: true
            }
        });

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: 'ustad',
            }
        });

        res.status(200).json({
            status: 'success',
            message: 'Ustad updated successfully',
            data: ustad
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
}


module.exports = { getAllUstads, getUstadById, createUstad, updateUstad, deleteUstad, activeUstad };