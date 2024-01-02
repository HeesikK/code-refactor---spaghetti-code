import { RouterProvider } from "react-router-dom";
import "./app.css";
import DiaLogProvider from "./contexts/DialogProvider";
import { worker } from "./__mock__/browser";
import { QueryClient, QueryClientProvider } from "react-query";
import { router } from "./router/router";

function App() {
  worker.start();

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <DiaLogProvider>
        <RouterProvider router={router} />
      </DiaLogProvider>
    </QueryClientProvider>
  );
}

export default App;
