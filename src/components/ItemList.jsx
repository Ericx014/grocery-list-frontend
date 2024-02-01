import SingleItem from "./SingleItem";

const ItemList = ({list, clearAll, editItem, deleteItem}) => {
  return (
    <section>
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
      <button onClick={clearAll} className="clear-button">
        Clear All
      </button>
    </section>
  );
};

export default ItemList;