import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {FaEdit, FaTrash} from "react-icons/fa";
import {useState} from "react";

const SingleItem = ({item, deleteItem, editItem}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <article>
      <h4>{item.title}</h4>
      {showInfo && <p>{item.note}</p>}
      <button onClick={() => setShowInfo(!showInfo)}>
        {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
      </button>
      <button onClick={() => editItem(item.id)}>
        <FaEdit />
      </button>
      <button onClick={() => deleteItem(item.id)}>
        <FaTrash />
      </button>
    </article>
  );
};

export default SingleItem;
