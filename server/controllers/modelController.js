const { OpenAI } = require("langchain/llms/openai");
const { FewShotPromptTemplate, PromptTemplate, } = require("langchain/prompts");

const { addItemToDatabase } = require("../utils/notionHelper");

function getCurrentDateFormatted(){
  const date = new Date();
const year = date.getFullYear();
const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based, so we add 1
const day = ("0" + date.getDate()).slice(-2); // We pad the day with a zero if it's a single digit
const formattedDate = `${year}-${month}-${day}`;

return formattedDate;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Write a function that gets current day of the week
function getCurrentDayOfWeek() {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[dayOfWeek];
}

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
    The fifth section is a recommended due date in the format YYYY-MM-DD.  Given that the current date is ${getCurrentDayOfWeek()} ${getCurrentDateFormatted()}, consider the category, title, priority and sentiment to determine a recommended due date.  The recommended due date must always be after current date.
  `

  // First, create a list of few-shot examples.
  const examples = [
    { input: "Finish the presentation for tomorrow's meeting", output: "work|Finish presentation|1|2|2023-05-13" },
    { input: "I need to call Yuki", output: "social|Call Yuki|2|2|2023-02-24" },
    { input: "I should start exercising more", output: "thought|I should start exercising more|personal|3|1|2023-08-15" },
    { input: "Buy groceries after work", output: "personal|Buy groceries|3|2|2023-04-03" },
    { input: "I love spending time with my friends", output: "thought|I love spending time with my friends|social|4|1|2023-09-23" },
    { input: "Prepare for the job interview next week", output: "work|Prepare for job interview|1|1|2023-08-13" },
    { input: "I've been feeling happy lately", output: "thought|I've been feeling happy lately|personal|4|3|2023-07-29" },
    { input: "Organize a surprise party for mom's birthday", output: "social|Organize surprise party|2|1|2023-10-31" },
    { input: "Finish the laundry this weekend", output: "personal|Finish laundry|3|2|2023-02-02" },
    { input: "I'm worried about the upcoming project deadline", output: "thought|I'm worried about the upcoming project deadline|work|3|3|2023-08-28" }
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

  // Ensure that the due date is after the current date
  const currentDate = new Date();
  const dueDate = new Date(llmArray[4]);
  if (dueDate < currentDate) {
    llmArray[4] = getCurrentDateFormatted();
  }

  // Ensure strings are capitalized
  llmArray[0] = capitalizeFirstLetter(llmArray[0]);
  llmArray[1] = capitalizeFirstLetter(llmArray[1]);

  const formattedData = {
    type: llmArray[0],
    title: llmArray[1],
    priority: llmArray[2],
    sentiment: llmArray[3],
    dueDate: llmArray[4]
  }

  return formattedData;
};

async function processAndSubmitToNotion(req, res) {
  const { userInput, openAIKey, notionKey, databaseId } = req.body;

  try {
    const databaseItem = await processUserText(userInput, openAIKey);
    const response  = await addItemToDatabase(databaseItem, notionKey, databaseId);

    const data = {
      "message": "Item added to database",
      "category": response.properties.Category.select.name,
      "sentiment": response.properties.Sentiment.select.name,
      "priority": response.properties.Priority.select.name,
      "title": response.properties.Title.title[0].plain_text,
      "dueDate": response.properties["Due Date"].date.start
    }
    
    return res.status(201).json({ 
      code: 201,
      status: "success",
      data: data
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: "error",
      data: {
        message: "Error processing user input"
      }
    });
  }
}

module.exports = { processAndSubmitToNotion };

