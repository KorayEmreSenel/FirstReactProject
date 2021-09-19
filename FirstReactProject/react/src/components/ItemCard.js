import { Card } from "react-bootstrap";

function ItemCard({ name, price, count, onClick }) {
  return (
    <div>
      <Card border="info" style={{ width: "" }}>
        <Card.Body>
          <Card.Text>{name}</Card.Text>
          <Card.Title className="text-primary">${price}</Card.Title>
          <button className={"button"} id={`1 ${name}`} onClick={onClick}>
            {"-"}{" "}
          </button>
          <button className={"button1"}>{count} </button>
          <button className={"button"} id={`0 ${name}`} onClick={onClick}>
            {"+"}{" "}
          </button>
        </Card.Body>
      </Card>
    </div>
  );
}
export default ItemCard;
