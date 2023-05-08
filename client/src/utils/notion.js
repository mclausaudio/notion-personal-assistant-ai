// Import Notion client
const { Client } = require("@notionhq/client");

// Initialize Notion client with your API key
const notion = new Client({ auth: process.env.NOTION_API_KEY });

const sentimentMap = {
  1: "Positive",
  2: "Neutral",
  3: "Negative"
}

// Helper function to add an item to a specified Notion database
async function addItemToDatabase(modelOutput, databaseId) {
  const { type, title, priority } = modelOutput;
  const sentiment = sentimentMap[modelOutput.sentiment];

  const properties = {
      "Category": {
        "id": "category",
        "type": "select",
        "select": {
          "name": type
        }
      },
      "Sentiment": {
        "id": "sentiment",
        "type": "select",
        "select": {
          "name": sentiment
        }
      },
      "Priority": {
        "id": "priority",
        "type": "number",
        "number": priority
      },
      "Title": {
        "id": "title",
        "type": "title",
        "title": [{
          "text": {
            "content": title
          }
        }]
      }
    }
  
  try {
    // Create a new page with the provided properties in the specified database
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.DB_ID,
      },
      properties,
    });

    console.log("Item added to database:", response);
    return response;
  } catch (error) {
    console.error("Error adding item to database:", error);
    throw error;
  }
}


module.exports = { addItemToDatabase };


// example properties:
// properties: {
//   'Grocery item': {
//     type: 'title',
//       title: [
//         {
//           type: 'text',
//           text: {
//             content: 'Tomatoes',
//           },
//         },
//       ],
//       },
//   Price: {
//     type: 'number',
//       number: 1.49,
//       },
//   'Last ordered': {
//     type: 'date',
//       date: {
//       start: '2021-05-11',
//         },
//   },
// },

