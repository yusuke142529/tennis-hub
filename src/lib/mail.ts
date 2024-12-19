// lib/mail.ts
export async function sendMockMail(to: string, text: string) {
    console.log(`[MOCK MAIL to:${to}] ${text}`)
    // 実運用ではSendGridやAWS SES, Mailgunなど使用
}