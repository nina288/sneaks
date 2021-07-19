import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get(
        "https://60ec6d69a78dc700178adb39.mockapi.io/cart"
      );

      const favoritesResponse = await axios.get(
        "https://60ec6d69a78dc700178adb39.mockapi.io/favorites"
      );
      const itemsResponse = await axios.get(
        "https://60ec6d69a78dc700178adb39.mockapi.io/items"
      );

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://60ec6d69a78dc700178adb39.mockapi.io/cart/${obj.id}`
      );
      setCartItems((prev) =>
        prev.filter((i) => Number(i.id) !== Number(obj.id))
      );
    } else {
      const { data } = await axios.post(
        "https://60ec6d69a78dc700178adb39.mockapi.io/cart",
        obj
      );
      setCartItems((prev) => [...prev, data]);
    }
  };
  const onRemoveItem = (id) => {
    axios.delete(`https://60ec6d69a78dc700178adb39.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const onAddToFavorite = async (obj) => {
    if (favorites.find((favObj) => favObj.id === obj.id)) {
      axios.delete(
        `https://60ec6d69a78dc700178adb39.mockapi.io/favorites/${obj.id}`
      );
      setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      const { data } = await axios.post(
        "https://60ec6d69a78dc700178adb39.mockapi.io/favorites",
        obj
      );
      setFavorites((prev) => [...prev, data]);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
    //console.log(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded }}>
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
          />
        )}
        <Header onClickCart={() => setCartOpened(true)} />
        <Route path="/" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
          />
        </Route>
        <Route path="/favorites" exact>
          <Favorites onAddToFavorite={onAddToFavorite} />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
