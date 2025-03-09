import LoadMoreData from "./components/LoadMoreData";

export default function App() {
  const url = "https://dummyjson.com/products";
  return (
    <>
      <LoadMoreData limit={10} url={url} />
    </>
  );
}
