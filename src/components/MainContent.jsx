import itemService from "../services/items";
import Form from "./Form";
import ItemList from "./ItemList";
import Alert from "./Alert";

const MainContent = ({
  user,
  userList,
  item,
  setItem,
  handleSubmit,
  isEditing,
  list,
  setList,
  editItem,
  deleteItem,
  alert,
  showAlert,
}) => {
  const currentUser = userList.find(
    (userInList) => userInList.username === user.username
  );
  const userItems = list.filter((listItem) => listItem.user === currentUser.id);

  const clearAll = (event) => {
    event.preventDefault();
    const currentUser = userList.find(
      (userInList) => userInList.username === user.username
    );
		const listAfterClear = list.filter((listItem) => listItem.user !== currentUser.id)
    list.map((listItem) => {
      if (listItem.user === currentUser.id) {
        itemService.deleteItem(listItem.id)
      }
    });
		setList(listAfterClear)
		showAlert(true, "success", "Item deleted")
  };

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
        {!(userItems.length === 0) && (
          <div>
            <ItemList
              currentUser={currentUser}
              userItems={userItems}
              list={list}
              editItem={editItem}
              deleteItem={deleteItem}
            />
            <button onClick={clearAll} className="clear-button">
              Clear All
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default MainContent;
