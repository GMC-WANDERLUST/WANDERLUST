import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";
import DashBoard from "./DashBoard";

function Admin() {
  
  return (
    <div className="wrapper">
      <Header />
      <Menu />
      <DashBoard />
      <Footer />
    </div>
  );
}

export default Admin;
