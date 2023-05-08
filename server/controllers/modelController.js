const { OpenAI } = require("langchain/llms/openai");
const { FewShotPromptTemplate, PromptTemplate, } = require("langchain/prompts");

const { addItemToDatabase } = require("../utils/notionHelper");

async function processUserText(userInput, openAIKey) {
  console.log("Processing user input:", userInput);
  const model = new OpenAI({
    openAIApiKey: openAIKey,
    temperature: 0.9,
    model: "gpt-4"
  });

  const prefix = `
    You are a productivity app that helps people organize their thoughts and tasks. It is your job to take a user's input and categorize it flawlessly, as well as provide a title, priority, and sentiment for the input.

    The category of the input can be one of the following:
      work = Professional tasks and responsibilities related to one's job or career.
      social = Interactions and activities involving other people, such as friends, family, or colleagues.
      personal = Activities or tasks related to self-care, personal interests, chores, hobbies, or individual goals.
      thought = Ideas, reflections, or mental impressions that arise spontaneously or as a result of contemplation or external stimuli.
      other = Any input that does not fit into the work, social, personal, or thought categories.

    The priority is categorized as 1 for high importance, 2 for medium-high importance, 3 for medium-low importance, or 4 for low importance, indicating the level of priority or time sensitivity associated with the task or thought.
    The sentiment is categorized as 1 for positive, 2 for neutral, or 3 for negative, reflecting the emotional tone or attitude expressed in the task or thought.

    The first section of the output will begin with the category of the input, for example: "work|", "thought|", or "social|".
    The second section of the output will be the title.  If the input's category is a "thought", the title will be the input text itself unmodified.  If the input's category is anything else, the title will be a summary of the input text.
    The third section of the output will be the priority.
    The fourth section of the output will be the sentiment.
  `

  // First, create a list of few-shot examples.
  const examples = [
    { input: "Finish the presentation for tomorrow's meeting", output: "work|Finish presentation|1|2" },
    { input: "I need to call Renee", output: "social|Call Renee|2|2" },
    { input: "I should start exercising more", output: "thought|I should start exercising more|personal|3|1" },
    { input: "Buy groceries after work", output: "personal|Buy groceries|3|2" },
    { input: "I love spending time with my friends", output: "thought|I love spending time with my friends|social|4|1" },
    { input: "Prepare for the job interview next week", output: "work|Prepare for job interview|1|1" },
    { input: "I've been feeling down lately", output: "thought|I've been feeling down lately|personal|4|3" },
    { input: "Organize a surprise party for mom's birthday", output: "social|Organize surprise party|2|1" },
    { input: "Finish the laundry this weekend", output: "personal|Finish laundry|3|2" },
    { input: "I'm worried about the upcoming project deadline", output: "thought|I'm worried about the upcoming project deadline|work|3|3" }
  ];
  // todo for above, make a frontend component so the user can set their own input and category examples.

  // Next, we specify the template to format the examples we have provided.
  const exampleFormatterTemplate = `
    input: {input}
    output: {output}
    `;
  const examplePrompt = new PromptTemplate({
    inputVariables: ["input", "output"],
    template: exampleFormatterTemplate,
  });
  // Finally, we create the `FewShotPromptTemplate`
  const fewShotPrompt = new FewShotPromptTemplate({
    /* These are the examples we want to insert into the prompt. */
    examples,
    /* This is how we want to format the examples when we insert them into the prompt. */
    examplePrompt,
    /* The prefix is some text that goes before the examples in the prompt. Usually, this consists of intructions. */
    prefix: prefix,
    /* The suffix is some text that goes after the examples in the prompt. Usually, this is where the user input will go */
    suffix: "input: {input}\n\noutput:",
    /* The input variables are the variables that the overall prompt expects. */
    inputVariables: ["input"],
    /* The example_separator is the string we will use to join the prefix, examples, and suffix together with. */
    exampleSeparator: "",
    /* The template format is the formatting method to use for the template. Should usually be f-string. */
    templateFormat: "f-string",
  });

  const formattedPrompt = await fewShotPrompt.format({ input: userInput });

  let llmResponse = await model.call(formattedPrompt);
  llmResponse = llmResponse.startsWith(" ") ? llmResponse.slice(1) : llmResponse;
  const llmArray = llmResponse.split('|');
  const databaseItem = {
    type: llmArray[0],
    title: llmArray[1],
    priority: Number(llmArray[2]),
    sentiment: Number(llmArray[3])
  }

  return databaseItem;
};

async function processAndSubmitToNotion(req, res) {
  const { userInput, openAIKey, notionKey, databaseId } = req.body;
  console.log("Processing and submitting to Notion:", userInput, openAIKey, notionKey, databaseId)
  try {
    const databaseItem = await processUserText(userInput, openAIKey);
    await addItemToDatabase(databaseItem, notionKey, databaseId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error processing user input" });
  }
  


  res.status(201).json({ message: "Item added to database" });

}

module.exports = { processAndSubmitToNotion };