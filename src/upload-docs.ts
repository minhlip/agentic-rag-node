import { readFile } from "node:fs/promises";
import path from "node:path";
import { langbase } from "./config";

async function main() {
	console.time("upload-docs");
	const cwd = process.cwd();
	const memoryName = "knowledge-base";

	const agentArchitecturePath = path.join(
		cwd,
		"src/docs",
		"agent-architectures.txt",
	);

	const agentArchitecture = await readFile(agentArchitecturePath);

	const agentResult = await langbase.memories.documents.upload({
		memoryName,
		contentType: "text/plain",
		documentName: "agent-architectures.txt",
		document: agentArchitecture,
		meta: { category: "Examples", topic: "Agent Architectures" },
	});

	console.log({
		cwd,
		memoryName,
		agentArchitecturePath,
		agentArchitecture,
		agentResult,
		result: agentResult.ok ? "✓ Agent doc uploaded" : "✗ Agent doc failed",
	});

	const langbaseFaqPath = path.join(cwd, "src/docs", "langbase-faq.txt");

	const langbaseFaq = await readFile(langbaseFaqPath);

	const faqResult = await langbase.memories.documents.upload({
		memoryName,
		contentType: "text/plain",
		documentName: "langbase-faq.txt",
		document: langbaseFaq,
		meta: { category: "Support", topic: "Langbase FAQ" },
	});

	console.log({
		langbaseFaq,
		langbaseFaqPath,
		faqResult,
		result: faqResult.ok ? "✓ FAQ doc uploaded" : "✗ FAQ doc failed",
	});
	console.timeEnd("upload-docs");
}

main();
