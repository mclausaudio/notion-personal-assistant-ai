import React from 'react';

const UserInputField = (props) => {
  const { type = 'text', value, handleChange } = props;

  if (type === 'textarea') {
    return (
      <>
        <textarea
          value={value}
          onChange={handleChange}
          className="form-control w-100"
        />
      </>
    );
  }

  return (
    <>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        className="form-control"
      />
    </>
  );
};

export default UserInputField;