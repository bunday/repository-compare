import Header from "./components/Header";
import RepositoryCard from "./components/RepositoryCard";
import StatCard from "./components/StatCard";

function App() {
  return (
    <div className="relative bg-gray-200 h-screen overflow-hidden p-4">
      <Header />
      <div className="flex flex-col-row">
        <RepositoryCard />
        <StatCard />
        <RepositoryCard />
      </div>
    </div>
  );
}

export default App;
