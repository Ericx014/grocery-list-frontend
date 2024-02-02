import Form from "./Form";
import ItemList from "./ItemList";
import Alert from "./Alert";

const MainContent = ({
  item,
  setItem,
  handleSubmit,
  isEditing,
  clearAll,
  listIsEmpty,
  list,
  editItem,
  deleteItem,
	alert,
	showAlert
}) => {
  return (
    <div className="center-container">
      <section className="container">
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h2 className="heading">Grocery List</h2>
        <Form
          item={item}
          setItem={setItem}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
        />
        {!listIsEmpty && (
          <ItemList list={list} editItem={editItem} deleteItem={deleteItem} />
        )}
        <button onClick={clearAll} className="clear-button">
          Clear All
        </button>
      </section>
    </div>
  );
};

export default MainContent;
