import {useState, useEffect} from "react";
import loginService from "./services/login";
import itemService from "./services/items";
import LoginForm from "./components/LoginForm";
import NavigationBar from "./components/Header";
import MainContent from "./components/MainContent";

const App = () => {
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState({title: "", note: ""});
  const [listIsEmpty, setListIsEmpty] = useState(true);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      itemService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      console.log("Log in successful: ", user.name);
    } catch (exception) {
      console.error("Error", exception);
    }
  };

  const handleLogout = () => {
    setUser(null);
    console.log("Log out successfully", user.name);
  };

  useEffect(() => {
    itemService.getAll().then((fetchedItems) => {
      console.log("Data fetched successfully");
      setList(fetchedItems);
    });
  }, []);

  useEffect(() => {
    console.log("List updated", list);
    setListIsEmpty(list.length === 0);
  }, [list]);

  const editItem = (id) => {
    const itemToEdit = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setItem({...item, title: itemToEdit.title, note: itemToEdit.note});
  };

  const deleteItem = (id) => {
    const itemToDelete = list.find((item) => item.id === id);
    itemService.deleteItem(id);
    console.log(itemToDelete);
    console.log(`Item (${itemToDelete.title}) deleted successfully`);
    const listAfterDelete = list.filter((item) => item.id !== id);
    setList(listAfterDelete);
    showAlert(true, "success", "Item deleted");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item.title) {
      showAlert(true, "danger", "Title cannot be empty");
    } else if (item.title && isEditing) {
      const newItem = {id: editId, title: item.title, note: item.note};
      itemService.updateItem(editId, newItem);

      const updatedList = list.map((listItem) => {
        return listItem.id === editId ? newItem : listItem;
      });
      setList(updatedList);
      setIsEditing(false);
      setEditId(null);
      setItem({title: "", note: "", id: ""});
      showAlert(true, "success", "Item updated");
    } else {
      itemService.createItem(item).then((newItem) => {
        setList([...list, newItem]);
        console.log("Item added successfully: ", item.title);
      });

      setItem({title: "", note: ""});
      showAlert(true, "success", "Item created");
    }
  };

  const clearAll = (event) => {
    event.preventDefault();
    list.map((listItem) => itemService.deleteItem(listItem.id));
    setList([]);
    showAlert(true, "success", "All items deleted");
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({show, type, msg});
  };

  return (
    <div>
      <div>
        {user === null ? (
          <LoginForm
            user={user}
            setUser={setUser}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        ) : (
          <div>
            <NavigationBar user={user} handleLogout={handleLogout} />
            <MainContent
              alert={alert}
              showAlert={showAlert}
              user={user}
              item={item}
              setItem={setItem}
              handleSubmit={handleSubmit}
              isEditing={isEditing}
              clearAll={clearAll}
              listIsEmpty={listIsEmpty}
              list={list}
              editItem={editItem}
              deleteItem={deleteItem}
              handleLogout={handleLogout}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
