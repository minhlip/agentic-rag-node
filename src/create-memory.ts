import { langbase } from "./config";

async function main() {
	const memory = await langbase.memories.create({
		name: "Knowledge-base",
		description: "An AI memory for agentic memory workshop",
		embedding_model: "openai:text-embedding-3-large",
	});

	console.log("AI Memory:", memory);
}

main();

/**
 * @returns
 AI Memory: {
  name: "knowledge-base",
  description: "An AI memory for agentic memory workshop",
  embedding_model: "openai:text-embedding-3-large",
  chunk_size: 1024,
  chunk_overlap: 256,
}
 */
