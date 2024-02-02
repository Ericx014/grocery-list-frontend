import {useState} from "react";
import userService from "../services/users";
import Form from "./Form";
import ItemList from "./ItemList";
import Alert from "./Alert";

const MainContent = ({
  user,
  item,
  setItem,
  handleSubmit,
  isEditing,
  clearAll,
  list,
  editItem,
  deleteItem,
  alert,
  showAlert,
}) => {
	// const listOfUserItems = list.filter((item) => item.user.username === user.username);

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
        {!(list.length === 0) && (
          <div>
            <ItemList
              user={user}
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
