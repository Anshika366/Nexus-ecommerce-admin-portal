import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        justifyContent: "center",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Link to="/">Home</Link>

      <Link to="/products">Products</Link>

      <Link to="/cart">Cart</Link>

      <Link to="/login">Login</Link>

      <Link to="/admin">Admin</Link>
    </nav>
  );
};

export default Navbar;
