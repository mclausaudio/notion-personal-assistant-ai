import fetch from 'node-fetch';

const processAndSubmitToNotion = async (props) => {
  const { userInput, openAIKey, notionKey, databaseId } = props;
  const payload = { userInput, openAIKey, notionKey, databaseId };
  try {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:8080/api/model', {
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
    console.log(error);
  }
};

export default { processAndSubmitToNotion }
