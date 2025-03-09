import { useEffect, useState } from "react";
import "./BirthdaysList.css";
export default function BirthdaysList({ url, limit }) {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchPeople() {
    try {
      setLoading(true);
      const response = await fetch(`${url}?limit=${limit}`);
      const result = await response.json();
      console.log(result.users);

      if (result.users) {
        setPeople(() => [...result.users]);
      }
    } catch (error) {
      console.log("Fetch error: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchPeople();
  }, [url, limit]);
  return (
    <>
      <main className="main-container">
        <section>
          <h3 className="birthday-heading">
            {loading ? "Loading..." : `${people.length} Birthdays today`}
          </h3>

          {people.map((person) => {
            let { id, image, firstName, lastName, age } = person;

            return (
              <article key={id} className="people-list">
                <img
                  src={image}
                  alt={`${firstName}-${lastName}-${id}`}
                  className="people-image"
                />
                <h4 className="people-name">
                  {firstName} {lastName}
                </h4>
                <p className="people-age">{age} years</p>
              </article>
            );
          })}
          <button
            disabled={!people.length}
            onClick={() => setPeople([])}
            className="clear-btn"
          >
            Clear all
          </button>
        </section>
      </main>
    </>
  );
}
