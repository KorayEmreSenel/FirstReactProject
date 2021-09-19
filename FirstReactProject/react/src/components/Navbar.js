function Navbar({ total }) {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid justify-content-center">
        <div className="text-xl-start mb-0 h1 " style={{ color: "#0D6EFD" }}>
          Market
        </div>
        {total > 0 && (
          <div
            className="text-xl-start mb-0 h5 "
            style={{ color: "#0D6EFD", position: "absolute", right: "15px" }}
          >
            ${total}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
