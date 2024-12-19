// scripts/updateAdminUser.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const email = 'mcenroe1.mowmow2@gmail.com'
    const hashedPassword = '$2b$10$cPxx1pdX.n0wbx9skHzcF.bWb0rJSKlEO/rCew4m6n6SRMeeiU.te' // 生成済みのパスワードハッシュ

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (!existingUser) {
        console.error('指定したメールアドレスのユーザーが存在しません。')
        return
    }

    await prisma.user.update({
        where: { email },
        data: {
            role: 'admin',
            password_hash: hashedPassword,
            email_verified_at: new Date()
        }
    })

    console.log('既存ユーザーを管理者に更新しました。')
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })