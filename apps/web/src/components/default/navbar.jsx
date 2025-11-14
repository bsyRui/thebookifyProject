
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/assets/images/favicon.ico" alt="Bookify Logo" />
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;