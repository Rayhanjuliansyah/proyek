const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

    await prisma.history.deleteMany({});
    await prisma.booking.deleteMany({});
    await prisma.userProfile.deleteMany({});
    await prisma.ustad.deleteMany({});
    await prisma.user.deleteMany({});

    await prisma.$queryRaw`ALTER SEQUENCE "user_id_seq" RESTART WITH 1`;
    await prisma.$queryRaw`ALTER SEQUENCE "ustad_id_seq" RESTART WITH 1`;
    await prisma.$queryRaw`ALTER SEQUENCE "booking_id_seq" RESTART WITH 1`;
    await prisma.$queryRaw`ALTER SEQUENCE "history_id_seq" RESTART WITH 1`;
    await prisma.$queryRaw`ALTER SEQUENCE "user_profile_id_seq" RESTART WITH 1`;

    console.log('Data berhasil dihapus.');

    const users = await prisma.user.createMany({
        data: [
            { name: 'User 1', email: 'user1@example.com', password: 'password1', isActive: true, role: 'user' },
            { name: 'User 2', email: 'user2@example.com', password: 'password2', isActive: true, role: 'user' },
            { name: 'Admin 1', email: 'admin1@example.com', password: 'password3', isActive: true, role: 'admin' },
            { name: 'Ustad 1', email: 'ustad1@example.com', password: 'password4', isActive: true, role: 'ustad' },
            { name: 'Ustad 2', email: 'ustad2@example.com', password: 'password5', isActive: true, role: 'ustad' }
        ]
    });

    console.log('Data user berhasil di-seed.');

    const userIds = await prisma.user.findMany({
        select: { id: true }
    });

    const ustads = await prisma.ustad.createMany({
        data: [
            { name: 'Ustad 1', expertise: ['Fiqh', 'Hadith'], description: 'Expert in Fiqh and Hadith', rating: 4.5, hourlyRate: 50, availability: true, userId: userIds[3].id },
            { name: 'Ustad 2', expertise: ['Quran', 'Akhlaq'], description: 'Expert in Quran and Akhlaq', rating: 4.0, hourlyRate: 60, availability: true, userId: userIds[4].id },
            { name: 'Ustad 3', expertise: ['Fiqh', 'Akhlaq'], description: 'Expert in Fiqh and Akhlaq', rating: 4.2, hourlyRate: 55, availability: false, userId: userIds[0].id },
            { name: 'Ustad 4', expertise: ['Hadith', 'Quran'], description: 'Expert in Hadith and Quran', rating: 4.7, hourlyRate: 65, availability: true, userId: userIds[1].id },
            { name: 'Ustad 5', expertise: ['Fiqh', 'Quran'], description: 'Expert in Fiqh and Quran', rating: 5.0, hourlyRate: 70, availability: true, userId: userIds[2].id }
        ]
    });

    console.log('Data ustad berhasil di-seed.');

    const ustadIds = await prisma.ustad.findMany({
        select: { id: true }
    });

    await prisma.userProfile.createMany({
        data: [
            { userId: userIds[0].id, firstName: 'User 1', lastName: 'Lastname 1', phone: '1234567891', imageUrl: 'https://example.com/image1.jpg' },
            { userId: userIds[1].id, firstName: 'User 2', lastName: 'Lastname 2', phone: '1234567892', imageUrl: 'https://example.com/image2.jpg' },
            { userId: userIds[2].id, firstName: 'Admin 1', lastName: 'Lastname 3', phone: '1234567893', imageUrl: 'https://example.com/image3.jpg' },
            { userId: userIds[3].id, firstName: 'Ustad 1', lastName: 'Lastname 4', phone: '1234567894', imageUrl: 'https://example.com/image4.jpg' },
            { userId: userIds[4].id, firstName: 'Ustad 2', lastName: 'Lastname 5', phone: '1234567895', imageUrl: 'https://example.com/image5.jpg' }
        ]
    });

    console.log('Data user profile berhasil di-seed.');

    const bookings = await prisma.booking.createMany({
        data: [
            { userId: userIds[0].id, ustadId: ustadIds[0].id, date: '2024-12-01', time: '10:00', duration: 1, location: 'Location 1', price: 50, status: 'pending' },
            { userId: userIds[1].id, ustadId: ustadIds[1].id, date: '2024-12-02', time: '11:00', duration: 2, location: 'Location 2', price: 60, status: 'completed' },
            { userId: userIds[2].id, ustadId: ustadIds[2].id, date: '2024-12-03', time: '09:00', duration: 1, location: 'Location 3', price: 55, status: 'accepted' },
            { userId: userIds[3].id, ustadId: ustadIds[3].id, date: '2024-12-04', time: '12:00', duration: 1, location: 'Location 4', price: 65, status: 'rejected' },
            { userId: userIds[4].id, ustadId: ustadIds[4].id, date: '2024-12-05', time: '13:00', duration: 1, location: 'Location 5', price: 70, status: 'pending' }
        ]
    });

    console.log('Data booking berhasil di-seed.');

    const bookingIds = await prisma.booking.findMany({
        select: { id: true }
    });

    await prisma.history.createMany({
        data: [
            { bookingId: bookingIds[0].id },
            { bookingId: bookingIds[1].id },
            { bookingId: bookingIds[2].id },
            { bookingId: bookingIds[3].id },
            { bookingId: bookingIds[4].id }
        ]
    });

    console.log('Data history berhasil di-seed.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });