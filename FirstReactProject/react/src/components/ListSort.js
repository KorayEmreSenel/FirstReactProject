import { useState } from "react";
import { ListGroup } from "react-bootstrap";

function ListSort({ onClick }) {
  const [order, setOrder] = useState("");
  return (
    <ListGroup
      as="ul"
      onClick={(event) => {
        const newOrder = event?.target?.id;
        setOrder(newOrder);
        return onClick(newOrder);
      }}
    >
      {order !== "" && (
        <ListGroup.Item action href="#" id="">
          <span style={{ color: "red" }}>Clear selection</span>
        </ListGroup.Item>
      )}
      <ListGroup.Item action href="#sort_price " id="_sort=price">
        Price low to high
      </ListGroup.Item>
      <ListGroup.Item
        action
        href="#sort_price_desc "
        id="_sort=price&_order=desc"
      >
        Price high to low
      </ListGroup.Item>
      <ListGroup.Item action href="#sort" id="_sort=added&_order=desc">
        New to old
      </ListGroup.Item>
      <ListGroup.Item action href="#sort_desc " id="_sort=added">
        Old to new
      </ListGroup.Item>
    </ListGroup>
  );
}

export default ListSort;
