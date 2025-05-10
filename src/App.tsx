// App.tsx
import { AppRoutes } from "./routes";
import { BackgroundImage } from './components/BackgroundImage';

export function App() {
  return (
    <div className="min-h-screen">
      <BackgroundImage />
      <img src="./assets/imagemFundo.png" alt="" />
      <div className="relative z-10 min-h-screen">
        <AppRoutes />
      </div>
    </div>
  );
}