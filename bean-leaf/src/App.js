import { Provider } from "react-redux";
import {store, persistor} from "./redux/store.ts"
import MainPage from "./components/mainPage.js";


const App = () => {
  return (
    <Provider store={store}>
      <MainPage></MainPage>
    </Provider>
  );
};

export default App;

