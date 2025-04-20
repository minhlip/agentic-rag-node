import { runAISupportAgent, runMemoryAgent } from "./agents";
import { langbase } from "./config";

async function main() {
	try {
		console.time("run-completion");
		const memories = await langbase.memories.list();
		console.log("Available memories:", memories);

		const docs = await langbase.memories.documents.list({
			memoryName: "knowledge-base",
		});
		console.log("Documents in memory:", docs);

		const query = "What is agent parallelization?";

		const chunks = await runMemoryAgent(query);

		const completion = await runAISupportAgent({ chunks, query });

		console.log("Memory chunks:", chunks);
		console.log("Completion:", completion);
		console.timeEnd("run-completion");
	} catch (error) {
		console.error("Error:", error);
	}
}

main();

/** RESULT
 @result
Available memories: [
  {
    name: "knowledge-base",
    description: "An AI memory for agentic memory workshop",
    embeddingModel: "openai:text-embedding-3-large",
  }
]
Documents in memory: [
  {
    name: "langbase-faq.txt",
    status: "completed",
    status_message: null,
    metadata: {
      size: 441,
      type: "text/plain",
    },
    enabled: true,
    chunk_size: 1024,
    chunk_overlap: 256,
  }, {
    name: "agent-architectures.txt",
    status: "completed",
    status_message: null,
    metadata: {
      size: 504,
      type: "text/plain",
    },
    enabled: true,
    chunk_size: 1024,
    chunk_overlap: 256,
  }
]
Usage: {
  prompt_tokens: 397,
  completion_tokens: 69,
  total_tokens: 466,
  prompt_tokens_details: {
    cached_tokens: 0,
    audio_tokens: 0,
  },
  completion_tokens_details: {
    reasoning_tokens: 0,
    audio_tokens: 0,
    accepted_prediction_tokens: 0,
    rejected_prediction_tokens: 0,
  },
}
Memory chunks: [
  {
    text: "Agent architectures define how AI systems are structured to process information and make decisions. Common patterns include:\n\n- Simple Reflex Agents: React directly to current input\n- Model-based Agents: Maintain internal state\n- Goal-based Agents: Work towards specific objectives\n- Utility-based Agents: Maximize a utility function\n- Learning Agents: Improve performance through experience\n\nAgent parallelization allows multiple agents to work simultaneously on different tasks or aspects of a problem.",
    similarity: 0.6760003,
    meta: {
      docName: "agent-architectures.txt",
      documentName: "agent-architectures.txt",
      category: "Examples",
      topic: "Agent Architectures",
    },
  }, {
    text: "Frequently Asked Questions about Langbase:\n\nQ: What is Langbase?\nA: Langbase is an API-first platform for building and deploying AI agents with TypeScript.\n\nQ: What features does Langbase offer?\nA: Langbase provides:\n- Serverless AI agents\n- Document memory and RAG\n- Custom embedding models\n- Multi-LLM support\n- TypeScript SDK\n\nQ: How do I get started?\nA: Sign up at langbase.com to get an API key, then install the SDK with npm i langbase",
    similarity: 0.3361098,
    meta: {
      docName: "langbase-faq.txt",
      documentName: "langbase-faq.txt",
      topic: "Langbase FAQ",
      category: "Support",
    },
  }
]
Completion: Agent parallelization allows multiple agents to work simultaneously on different tasks or aspects of a problem. This means that instead of a single agent handling all processing sequentially, several agents operate in parallel to increase efficiency and speed in solving complex problems or handling multiple tasks at once [1].

[1] Context document on Agent architectures and Langbase FAQ.
[19.79s] run-completion
 */
