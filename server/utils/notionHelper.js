// Import Notion client
const { Client } = require("@notionhq/client");

require('dotenv').config({path: '../.env'});


const sentimentMap = {
  1: "Positive",
  2: "Neutral",
  3: "Negative"
}

// Helper function to add an item to a specified Notion database
async function addItemToDatabase(itemToAdd, notionKey, databaseId) {
  const notion = new Client({ auth: notionKey });
  
  const { type, title, priority, dueDate } = itemToAdd;
  const sentiment = sentimentMap[itemToAdd.sentiment];
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
        "type": "select",
        "select": {
          "name": priority
        }
      },
      "Title": {
        "id": "title",
        "type": "title",
        "title": [{
          "text": {
            "content": title
          }
        }]
      },
      "Due Date": {
        "id": "Due Date",
        "type": "date",
        "date": {
          "start": dueDate          
        }
      }
  }
  
  try {
    // Create a new page with the provided properties in the specified database
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties,
    });

    return response;
  } catch (error) {
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

