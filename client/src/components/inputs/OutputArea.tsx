import React from 'react'

export default function OutputArea(props: any) {
  const { response } = props;
  const { data } = response;
  const { message = '' } = data;
  

  console.log('response', response)


  if (response.code === 500) return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  )

  if (response.code === 201) {
    return (
      <div className="alert alert-success" role="alert">
        <p>{message}</p>
        <ul>
          <li>Title: { data.title }</li>
          <li>Category: {data.category }</li>
          <li>Priority: {data.priority}</li>
          <li>Sentiment: {data.sentiment}</li>
        </ul>
      </div>
    )
  }

  return (
    <div className="alert alert-light" role="alert">
      <p>Please input your task...</p>
    </div>
  )
}
