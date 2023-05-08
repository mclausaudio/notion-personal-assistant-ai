import React from 'react';

const UserInputField = (props) => {
  const { type = 'text', value, handleChange } = props;

  return (
    <div>
      <textarea
        type={type}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default UserInputField;