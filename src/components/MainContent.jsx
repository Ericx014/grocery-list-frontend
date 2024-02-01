import Form from "./Form";
import ItemList from "./ItemList";

const MainContent = ({
  item,
  setItem,
  handleSubmit,
  isEditing,
  clearAll,
  listIsEmpty,
  list,
  editItem,
	deleteItem
}) => {
  return (
    <section className="container">
      <h2 className="heading">Grocery List</h2>
      <Form
        item={item}
        setItem={setItem}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
        clearAll={clearAll}
      />
      {!listIsEmpty && (
        <ItemList
          list={list}
          clearAll={clearAll}
          editItem={editItem}
          deleteItem={deleteItem}
        />
      )}
    </section>
  );
};

export default MainContent