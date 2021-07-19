import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="d-flex justify-between p-40">
      <div className="d-flex align-center">
        <Link to="/">
          <img width={40} height={40} src="/img/logo.png" alt="Logotype" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </Link>
      </div>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.png" alt="Корзина" />

          <span>1205 руб.</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img
              width={18}
              height={18}
              src="/img/heart-unliked.svg"
              alt="Закладки"
            />
          </Link>
        </li>
        <li>
          <img width={18} height={18} src="/img/user.svg" alt="Пользователь" />
        </li>
      </ul>
    </header>
  );
}
export default Header;
