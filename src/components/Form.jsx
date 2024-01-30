const Form = ({item, setItem, handleSubmit, isEditing}) => {

  return (
    <form>
      Title:{" "}
      <input
        type="text"
        placeholder="eg. Chicken"
        value={item.title}
        onChange={(e) => setItem({...item, title: e.target.value})}
      />{" "}
      <br />
      Note:{" "}
      <input
        type="text"
        placeholder="eg. Thigh and drumsticks only"
        value={item.note}
        onChange={(e) => setItem({...item, note: e.target.value})}
      />{" "}
      <br />
      <button type="submit" onClick={handleSubmit}>
        {isEditing ? "Edit" : "Add"}
      </button>
    </form>
  );
};

export default Form