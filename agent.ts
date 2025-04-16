import dotenv from 'dotenv'

dotenv.config();
// console.log(`OPENAI_API_KEY - ${process.env.OPENAI_API_KEY}`)
// console.log(`TAVILY_API_KEY - ${process.env.TAVILY_API_KEY}`)
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import { ChatOpenAI } from '@langchain/openai';
import { Mem0Memory } from '@langchain/community/memory/mem0';
import { HumanMessage } from '@langchain/core/messages';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { MemorySaver } from '@langchain/langgraph';


const agentTools = [new TavilySearchResults({maxResults:3})]
const agentModel = new ChatOpenAI({
    model:"gpt-4o",
    temperature:0
});
const agentCheckpointer = new MemorySaver();
const agent = createReactAgent({
    llm:agentModel,
    tools:agentTools,
    checkpointSaver:agentCheckpointer
});

const agentFinalState = await agent.invoke(
    {messages: [new HumanMessage("What is the weather in New Delhi?")]},
    {configurable: {thread_id:"42"}}
);
console.log(agentFinalState.messages[agentFinalState.messages.length -1].content);

