import {useState, useEffect} from "react";
import Form from "./components/Form";
import SingleItem from "./components/SingleItem";
import itemService from "./services/items"

const App = () => {
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState({title: "", note: ""});

	useEffect(() => {
		itemService.getAll()
		.then((fetchedItems) => {
      console.log("Data fetched successfully");
      setList(fetchedItems);
    });
	}, [])

	useEffect(() => {
		console.log("List updated" , list)
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
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item.title) {
      console.log("Empty title");
			
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

		} else {
			itemService.createItem(item)
				.then((newItem) => {
					setList([...list, newItem]);
					console.log("Item added successfully: ", item.title);
				})
			
			setItem({title: "", note: ""})
  };
	}

  return (
    <section>
      <h2>Grocery List</h2>
      <Form
        item={item}
        setItem={setItem}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
      />

      {list.map((item, index) => (
        <SingleItem
          key={index}
          item={item}
          editItem={editItem}
          deleteItem={deleteItem}
        />
      ))}
    </section>
  );
};

export default App
