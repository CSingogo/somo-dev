import { useEffect, useState } from "react";
import ClickSpark, { type ClickSparkProps } from "./ClickSpark";

// White sparks vanish on the light theme, so follow the `dark` class on <html>.
export default function ThemedClickSpark(props: Omit<ClickSparkProps, "sparkColor">) {
  const [color, setColor] = useState("#fff");

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setColor(root.classList.contains("dark") ? "#fff" : "#000");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return <ClickSpark {...props} sparkColor={color} />;
}
