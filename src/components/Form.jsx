import React from "react";

const Form = ({item, setItem, handleSubmit, isEditing}) => {
  return (
    <form className="form">
      <label className="form-label">Title</label>
      <input
        className="form-input"
        type="text"
        placeholder="e.g. Chicken"
        value={item.title}
        onChange={(e) => setItem({...item, title: e.target.value})}
      />
      <label className="form-label">Note</label>
        <input
          className="form-input"
          type="text"
          placeholder="e.g. Thigh and drumsticks only"
          value={item.note}
          onChange={(e) => setItem({...item, note: e.target.value})}
        />
      <button className="form-button" type="submit" onClick={handleSubmit}>
        {isEditing ? "Edit Item" : "Add Item"}
      </button>
    </form>
  );
};

export default Form;
