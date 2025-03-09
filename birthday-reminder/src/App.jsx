import BirthdaysList from "./components/BirthdaysList";

export default function App() {
  const url = "https://dummyjson.com/users";
  let limit = 4;
  return (
    <>
      <BirthdaysList url={url} limit={limit} />
    </>
  );
}
