import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {FaEdit, FaTrash} from "react-icons/fa";
import {useState} from "react";

const SingleItem = ({item, deleteItem, editItem}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <article className="list-item-container">
      <div className="item-container">
        <h4 className="item-title">{item.title}</h4>
        {showInfo && <p className="item-note">{item.note}</p>}
      </div>
      <div className="button-container">
        <button className="show-button" onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
        <button className="edit-button" onClick={() => editItem(item.id)}>
          <FaEdit />
        </button>
        <button className="delete-button" onClick={() => deleteItem(item.id)}>
          <FaTrash />
        </button>
      </div>
    </article>
  );
};

export default SingleItem;
