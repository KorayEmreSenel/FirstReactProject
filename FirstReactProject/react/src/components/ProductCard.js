import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function ProductCard({ name, onClick, price }) {
  return (
    <Card>
      <Card.Img variant="top" />
      <Card.Body>
        <svg
          className="bd-placeholder-img card-img-top"
          height="110"
          role="img"
          aria-label="Placeholder: Thumbnail"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#55595c"></rect>
          <text x="50%" y="25%" fill="#eceeef" dy=".3em"></text>
        </svg>
        <Card.Title className="text-primary">${price}</Card.Title>
        <Card.Text>{name}</Card.Text>
        <div className="d-grid gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onClick(name, [price, 1])}
          >
            Add
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
