import { Provider } from "react-redux";
import {store} from "./redux/store.ts"
import MainPage from "./components/mainPage.js";
//qweqwerqwerqwerqw
const App = () => {
  return (
    <Provider store={store}>
      <MainPage></MainPage>
    </Provider>
  );
};

export default App;

