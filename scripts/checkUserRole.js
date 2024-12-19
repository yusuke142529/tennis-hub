const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const email = "mcenroe1.mowmow2@gmail.com"; // 管理者ユーザーのメールアドレスに置き換えてください
    const user = await prisma.user.findUnique({ where: { email } });
    console.log(user);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })