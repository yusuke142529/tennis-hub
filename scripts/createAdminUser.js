
// scripts/createAdminUser.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const hashedPassword = '$2b$10$cPxx1pdX.n0wbx9skHzcF.bWb0rJSKlEO/rCew4m6n6SRMeeiU.te'

    await prisma.user.create({
        data: {
            email: 'mcenroe1.mowmow2@gmail.com',
            password_hash: hashedPassword,
            email_verified_at: new Date(),
            role: 'admin',
        }
    })

    console.log('Admin user created')
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })