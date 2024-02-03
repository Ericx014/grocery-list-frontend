import SingleItem from "./SingleItem";

const ItemList = ({userItems, editItem, deleteItem}) => {
  return (
    <section>
      <div className="single-item-container">
        {userItems &&
          userItems.map((item, index) => {
            return (
              <SingleItem
                key={index}
                item={item}
                editItem={editItem}
                deleteItem={deleteItem}
              />
            );
          })}
      </div>
    </section>
  );
};

export default ItemList;
