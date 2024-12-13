// import OpenAI from 'openai';
// (async () => {
//     const openai = new OpenAI({
//         apiKey: 'xai-CUrQFS4Cs0jSg7UT2tDNo0pQOFXiJzJmxtR4bHQf1DBO4oY1CDItwoUYYCI0uiKkUPTNsldZY3WkKBLi',
//         baseURL: 'https://api.x.ai/v1',
//       })
      
//       const completion = await openai.chat.completions.create({
//         model: 'grok-beta',
//         messages: [
//           { role: 'system', content: "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy."},
//           {
//             role: 'user',
//             content: 'What is the meaning of life, the universe, and everything?',
//           },
//         ],
//       })     
//     console.log(completion.choices[0].message);
//   })();
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

async function main() {
    const allUsers = await prisma.authors.findFirst({})
    console.log(allUsers)
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })