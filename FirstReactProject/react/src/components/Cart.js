import ItemCard from "./ItemCard";

function Cart({ cartList, total, onClick }) {
  return (
    <div>
      {[...cartList.entries()].map((value) => (
        <ItemCard
          fluid
          name={value[0]}
          price={value[1][0]}
          count={value[1][1]}
          onClick={onClick}
        ></ItemCard>
      ))}
      {cartList.size > 0 && (
        <div style={{ color: "#0D6EFD", fontWeight: "bold" }}>${total}</div>
      )}
    </div>
  );
}
export default Cart;
