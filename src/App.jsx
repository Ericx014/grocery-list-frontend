import {useState, useEffect} from "react";
import loginService from "./services/login";
import itemService from "./services/items";
import userService from "./services/users";
import LoginForm from "./components/LoginForm";
import NavigationBar from "./components/Header";
import MainContent from "./components/MainContent";

const App = () => {
  const [list, setList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState({title: "", note: ""});
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
      console.log("Log in successful: ", user);
    } catch (exception) {
      showAlert(true, "danger", "Wrong password or username");
      console.error("Error", exception);
    }
  };

  const handleLogout = () => {
    setUser(null);
    console.log("Log out successfully", user.name);
  };

  useEffect(() => {
    itemService.getAll().then((fetchedItems) => {
      console.log("Items fetched successfully", fetchedItems);
      setList(fetchedItems);
    });
  }, []);

  useEffect(() => {
    userService.getAll().then((fetchedUsers) => {
      console.log("Users fetched successfully", fetchedUsers);
      setUserList(fetchedUsers);
    });
  }, []);

  useEffect(() => {
    console.log("List updated", list);
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
        const newList = [...list, newItem];
        setList(newList);
        console.log("Item added successfully: ", item);
        console.log("User", user);
      });

      setItem({title: "", note: ""});
      showAlert(true, "success", "Item created");
    }
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
            userList={userList}
            setUserList={setUserList}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            alert={alert}
            showAlert={showAlert}
            list={list}
          />
        ) : (
          <div>
            <NavigationBar user={user} handleLogout={handleLogout} />
            <MainContent
              userList={userList}
              alert={alert}
              showAlert={showAlert}
              user={user}
              item={item}
              setItem={setItem}
              handleSubmit={handleSubmit}
              isEditing={isEditing}
              list={list}
              setList={setList}
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
