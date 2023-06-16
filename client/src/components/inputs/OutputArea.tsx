import React from 'react'

export default function OutputArea(props: any) {
  const { response } = props;
  const { data = {} } = response;
  const { message = '' } = data;
  
  let messageMarkup;

  if (response.code === 500) {
    messageMarkup = (
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    )
  } else if (response.code === 201) {
    messageMarkup = (
      <div className="alert alert-success" role="alert">
        <p>{message}</p>
        <ul>
          <li>Title: { data.title }</li>
          <li>Category: {data.category }</li>
          <li>Priority: {data.priority}</li>
          <li>Sentiment: {data.sentiment}</li>
          <li>Due date: {data.dueDate}</li>
        </ul>
      </div>
    )
  } else {
    messageMarkup = (
      <div className="alert alert-light" role="alert">
        <p>{message}</p>
      </div>
    )
  }

  return (
    <>
      {messageMarkup}
    </>
  )
}
