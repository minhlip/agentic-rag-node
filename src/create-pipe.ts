import { langbase } from "./config";

async function main(){
  const supportAgent = await langbase.pipes.create({
    name: 'ai-support-agent',
    description: 'An AI agent to support users with their queries.',
    messages: [
      {
        role: 'system',
        content: `You're a helpful AI assistant.
        You wull assist users with their queries.
        Always ensure that you provide accurate and to the point information.
        `
      }
    ]
  })

  console.log('Support agent:', supportAgent)
}

main()