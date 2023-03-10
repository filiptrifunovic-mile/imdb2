import { BrowserRouter } from "react-router-dom";
import Body from "../layouts/body";
import Footer from "../layouts/footer";
import Header from "../layouts/header";

const AppContainer = () => {
  return (
    <BrowserRouter>
      <Header />
      <Body />
      <Footer />
    </BrowserRouter>
  );
};

export default AppContainer;
