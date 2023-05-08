
import AppLoader from "./components/hoc/appLoader";
import ClientsTable from "./layouts/clients-table";

function App() {
  return (
    <AppLoader>
      <ClientsTable />
    </AppLoader>
  );
}

export default App;
