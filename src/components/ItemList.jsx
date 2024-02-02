import SingleItem from "./SingleItem";

const ItemList = ({user, list, editItem, deleteItem}) => {
  return (
    <section>
      <div className="single-item-container">
				{/* IF LIST IS EMPTY IT BREAKS*/}
        {list.map((item, index) => {
          if (item.user.username === user.username) {
            return (
              <SingleItem
                key={index}
                item={item}
                editItem={editItem}
                deleteItem={deleteItem}
              />
            );
          }
        })}
      </div>
    </section>
  );
};

export default ItemList;