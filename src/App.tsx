import { useEffect } from "react";
import { Treemap } from "./components/Treemap";
import { useSettingsStore } from "./stores/useSettingsStore";

function App() {
  const theme = useSettingsStore((state) => state.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);

  useEffect(() => {
    setTheme(theme);
  }, []);

  return <Treemap />;
}

export default App;
