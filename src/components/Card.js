import React from "react";
import AppContext from "../context";
function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false
}) {
  const { isItemAdded } = React.useContext(AppContext);

  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
  };
  //console.log(isAdded);
  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card">
      <div className="favorite" onClick={onClickFavorite}>
        <img
          src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
          alt="Unliked"
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>

        <img
          className="plus"
          onClick={onClickPlus}
          src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/plus.svg"}
          alt="Plus"
        />
      </div>
    </div>
  );
}
export default Card;
