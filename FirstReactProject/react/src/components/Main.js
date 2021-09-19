import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Pager from "./Pager";
import Navbar from "./Navbar";
import axios from "axios";
import ListSort from "./ListSort";
import Buttons from "./Buttons";
import Cart from "./Cart";
import ManufacturerSelect from "./ManufacturerSelect";
const LIMIT = 12;

function Main(props) {
  const [data, setData] = useState([]);
  const [response, setResponse] = useState({});
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("");
  const [button, setButton] = useState("");
  const [limit, setLimit] = useState(12);
  const [cartList, setCartList] = useState(new Map());
  const [total, setTotal] = useState(0);
  const [manufacturer, setManufacturer] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        let dataString = `http://localhost:3002/items?${order}&_page=${page}&_limit=${LIMIT}&itemType_like=${button}`;
        for (var i = 0; i < manufacturer.length; i++) {
          const trimmedManufacturer = manufacturer[i].split(" ").join("-");
          console.log(trimmedManufacturer);
          dataString = dataString + `&manufacturer_like=${trimmedManufacturer}`;
        }
        const responseData = await axios.get(dataString);
        return responseData;
      } catch (error) {
        console.error(error);
      }
    }

    getData().then(setResponse);
  }, [page, order, button, manufacturer]);

  useEffect(() => {
    if (response?.headers) {
      setData(response.data);
      setLimit(Math.ceil(response.headers["x-total-count"] / LIMIT));
    }
  }, [response]);

  useEffect(() => {
    if (page > limit) {
      setPage(limit);
    }
  }, [page, limit]);

  const onClickPagination = (event) => {
    const retPage = isNaN(parseInt(event?.target?.id))
      ? 1
      : parseInt(event?.target?.id);
    const newPage = Math.min(retPage, limit);
    setPage(Number.parseInt(newPage));
  };

  const onClickListSort = (order) => {
    setOrder(order);
  };

  const onClickButton = (event) => {
    setButton((prevState) => {
      if (prevState === event?.target?.id) {
        return "";
      }
      return event?.target?.id;
    });
  };
  const onClickManufacturer = (event) => {
    setManufacturer((prevState) => {
      if (prevState.includes(event?.target?.id)) {
        var newArr = manufacturer.filter(function (value) {
          return event?.target?.id !== value;
        });
        return newArr;
      }
      return [...manufacturer, event?.target?.id];
    });
  };

  console.log(manufacturer);

  const onClickCount = (event) => {
    const key = event.target.id.slice(2);
    let countTemp = cartList.get(key);
    if (event.target.id[0] === "1") {
      if (cartList.get(key)) {
        countTemp[1] = countTemp[1] - 1;
        if (countTemp[1] === 0) {
          cartList.delete(key);
          setTotal(parseFloat((total - parseFloat(countTemp)).toFixed(2)));
          setCartList(cartList);
          return;
        }
        setCartList((prev) => new Map([...prev, [key, countTemp]]));
        setTotal(parseFloat((total - parseFloat(countTemp)).toFixed(2)));
      }
    } else {
      onAddCart(key, countTemp);
      setCartList((prev) => new Map([...prev, [key, countTemp]]));
    }
  };

  const onAddCart = (key, value) => {
    if (cartList.has(key)) {
      value[1] = cartList.get(key)[1] + 1;
    }
    setTotal(parseFloat((total + parseFloat(value)).toFixed(2)));
    setCartList((prev) => new Map([...prev, [key, value]]));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar total={total} />
      </div>
      <div className="row">
        <div className="col-2 col-sm-2">
          <div className="row">
            <div className="col">
              <ListSort onClick={onClickListSort} />
            </div>
          </div>
          <div className="row">
            <ManufacturerSelect onClick={onClickManufacturer} button={button} />
          </div>
        </div>
        <div className="col-8">
          <div className="row-fluid">
            <Buttons onClick={onClickButton} selectedButton={button} />
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            {data.map((item) => (
              <ProductCard
                name={item.name}
                price={item.price}
                key={item.added}
                cartVisible
                onClick={onAddCart}
              />
            ))}
          </div>
          <Pager onClick={onClickPagination} x={limit} currentPage={page} />
        </div>
        <div className="col-2 col-sm-2">
          <Cart cartList={cartList} total={total} onClick={onClickCount} />
        </div>
      </div>
    </div>
  );
}

export default Main;
