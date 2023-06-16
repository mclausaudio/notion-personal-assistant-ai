import fetch from 'node-fetch';

const API_DOMAIN = process.env.API_DOMAIN || 'http://localhost:8000';

const processAndSubmitToNotion = async (props) => {
  const { userInput, openAIKey, notionKey, databaseId } = props;
  const payload = { userInput, openAIKey, notionKey, databaseId };
  try {
    return new Promise((resolve, reject) => {
      fetch(`${API_DOMAIN}/api/model`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(json => {
          resolve(json);
        })
        .catch(err => {
          reject(err);
        });
    });
  } catch (error) {
    throw error;
  }
};

export default { processAndSubmitToNotion }
