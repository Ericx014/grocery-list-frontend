import {useState, useEffect} from "react";
import Form from "./components/Form";
import SingleItem from "./components/SingleItem";
import itemService from "./services/items"
import Alert from "./components/Alert";

const App = () => {
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState({title: "", note: ""});
	const [listIsEmpty, setListIsEmpty] = useState(true);
	const [alert, setAlert] = useState({
		show: false,
		msg: "",
		type: ""
	})

	useEffect(() => {
		itemService.getAll()
		.then((fetchedItems) => {
      console.log("Data fetched successfully");
      setList(fetchedItems);
    });
	}, [])

	useEffect(() => {
		console.log("List updated" , list)
		setListIsEmpty(list.length === 0);
	}, [list])

  const editItem = (id) => {
  	const itemToEdit = list.find((item) => item.id === id)
  	setIsEditing(true)
  	setEditId(id)
  	setItem({...item, title: itemToEdit.title, note: itemToEdit.note})
  }

const deleteItem = (id) => {
	const itemToDelete = list.find((item) => item.id === id)
	itemService.deleteItem(id)
	console.log(itemToDelete)
	console.log(`Item (${itemToDelete.title}) deleted successfully`);
  const listAfterDelete = list.filter((item) => item.id !== id);
  setList(listAfterDelete);
	showAlert(true, "success", "Item deleted")
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item.title) {
			showAlert(true, "danger", "Title cannot be empty")
			
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
			showAlert(true, "success", "Item updated")

		} else {
			itemService.createItem(item)
				.then((newItem) => {
					setList([...list, newItem]);
					console.log("Item added successfully: ", item.title);
				})
			
			setItem({title: "", note: ""})
			showAlert(true, "success", "Item created")
  };
	}

	const clearAll = (e) => {
		e.preventDefault()
		list.map(listItem => itemService.deleteItem(listItem.id))
		setList([])
		showAlert(true, "success", "All items deleted");
	}

	const showAlert = (show=false, type="", msg="") => {
		setAlert({show, type, msg})
	}

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
          clearAll={clearAll}
        />
        {!listIsEmpty && (
          <div className="single-item-container">
            {list.map((item, index) => (
              <SingleItem
                key={index}
                item={item}
                editItem={editItem}
                deleteItem={deleteItem}
              />
            ))}
          </div>
        )}
        {!listIsEmpty && (
          <button onClick={clearAll} className="clear-button">
            Clear All
          </button>
        )}
      </section>
    </div>
  );
};

export default App
