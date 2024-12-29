require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {

    await prisma.booking.deleteMany();
    await prisma.userProfile.deleteMany();
    await prisma.ustad.deleteMany();
    await prisma.user.deleteMany();

    await prisma.$queryRaw`ALTER SEQUENCE "user_id_seq" RESTART WITH 1`;
    await prisma.$queryRaw`ALTER SEQUENCE "ustad_id_seq" RESTART WITH 1`;
    await prisma.$queryRaw`ALTER SEQUENCE "booking_id_seq" RESTART WITH 1`;
    await prisma.$queryRaw`ALTER SEQUENCE "user_profile_id_seq" RESTART WITH 1`;

    console.log('Data berhasil dihapus.');

    const hashedPassword = await bcrypt.hash('123123', +process.env.BCRYPT_SALT);
    const users = await prisma.user.createMany({
        data: [
            { name: 'User 1', email: 'user1@example.com', password: hashedPassword, isActive: true, role: 'user' },
            { name: 'User 2', email: 'user2@example.com', password: hashedPassword, isActive: true, role: 'user' },
            { name: 'Admin 1', email: 'admin1@example.com', password: hashedPassword, isActive: true, role: 'admin' },
            { name: 'Ustad 1', email: 'ustad1@example.com', password: hashedPassword, isActive: true, role: 'ustad' },
            { name: 'Ustad 2', email: 'ustad2@example.com', password: hashedPassword, isActive: true, role: 'ustad' }
        ]
    });

    console.log('Data user berhasil di-seed.');

    const userIds = await prisma.user.findMany({
        select: { id: true }
    });

    const ustads = await prisma.ustad.createMany({
        data: [
            { name: 'Burhan', expertise: ['Fiqh', 'Hadith'], description: 'A highly knowledgeable scholar with in-depth expertise in Fiqh and Hadith, offering insightful guidance.', hourlyRate: 50, availability: true, userId: userIds[3].id },
            { name: 'Juliansyah', expertise: ['Quran', 'Akhlaq'], description: 'A dedicated scholar specializing in Quranic studies and Akhlaq, providing profound spiritual and moral guidance.', hourlyRate: 60, availability: true, userId: userIds[4].id },
            { name: 'Rayhan', expertise: ['Fiqh', 'Akhlaq'], description: 'An expert in Fiqh and Akhlaq, committed to delivering comprehensive understanding of Islamic jurisprudence and ethical teachings.', hourlyRate: 55, availability: false, userId: userIds[0].id },
            { name: 'Panjul', expertise: ['Hadith', 'Quran'], description: 'A distinguished scholar with extensive knowledge of Hadith and Quran, offering detailed interpretations and wisdom.', hourlyRate: 65, availability: true, userId: userIds[1].id },
            { name: 'Jono', expertise: ['Fiqh', 'Quran'], description: 'A proficient scholar with a deep understanding of both Fiqh and Quran, providing expert-level insights into Islamic teachings.', hourlyRate: 70, availability: true, userId: userIds[2].id }
        ]

    });

    console.log('Data ustad berhasil di-seed.');

    const ustadIds = await prisma.ustad.findMany({
        select: { id: true }
    });

    await prisma.userProfile.createMany({
        data: [
            { userId: userIds[0].id, firstName: 'User 1', lastName: 'Lastname 1', phone: '1234567891', imageUrl: 'https://example.com/image1.jpg', isActive: true },
            { userId: userIds[1].id, firstName: 'User 2', lastName: 'Lastname 2', phone: '1234567892', imageUrl: 'https://example.com/image2.jpg', isActive: true },
            { userId: userIds[2].id, firstName: 'Admin 1', lastName: 'Lastname 3', phone: '1234567893', imageUrl: 'https://example.com/image3.jpg', isActive: true },
            { userId: userIds[3].id, firstName: 'Ustad 1', lastName: 'Lastname 4', phone: '1234567894', imageUrl: 'https://example.com/image4.jpg', isActive: true },
            { userId: userIds[4].id, firstName: 'Ustad 2', lastName: 'Lastname 5', phone: '1234567895', imageUrl: 'https://example.com/image5.jpg', isActive: true }
        ]
    });

    console.log('Data user profile berhasil di-seed.');

    const bookings = await prisma.booking.createMany({
        data: [
            { userId: userIds[0].id, ustadId: ustadIds[0].id, bookingDate: new Date('2024-12-01T00:00:00.000Z'), eventDate: new Date('2024-12-01T10:00:00.000Z'), duration: '1', location: 'Location 1', price: 50, status: 'pending' },
            { userId: userIds[1].id, ustadId: ustadIds[1].id, bookingDate: new Date('2024-12-02T00:00:00.000Z'), eventDate: new Date('2024-12-01T11:00:00.000Z'), duration: '2', location: 'Location 2', price: 60, status: 'completed' },
            { userId: userIds[2].id, ustadId: ustadIds[2].id, bookingDate: new Date('2024-12-03T00:00:00.000Z'), eventDate: new Date('2024-12-01T09:00:00.000Z'), duration: '1', location: 'Location 3', price: 55, status: 'accepted' },
            { userId: userIds[3].id, ustadId: ustadIds[3].id, bookingDate: new Date('2024-12-04T00:00:00.000Z'), eventDate: new Date('2024-12-01T12:00:00.000Z'), duration: '1', location: 'Location 4', price: 65, status: 'rejected' },
            { userId: userIds[4].id, ustadId: ustadIds[4].id, bookingDate: new Date('2024-12-05T00:00:00.000Z'), eventDate: new Date('2024-12-01T13:00:00.000Z'), duration: '1', location: 'Location 5', price: 70, status: 'pending' }
        ]
    });

    console.log('Data booking berhasil di-seed.');

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