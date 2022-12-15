import { useEffect, useState } from "react";

export const DailyPhrase = () => {
  const [phrase, setPhrase] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  const api = "/api/phrase"

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setPhrase(data.phrase);
        setAuthor(data.author);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setPhrase(
          "El único modo de hacer un gran trabajo es amar lo que haces."
        );
        setAuthor("Steve Jobs");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 shadow-lg bg-gradient-to-tr from-pink-500/20 to-yellow-500/20 bg-opacity-10 backdrop-blur-lg rounded-full drop-shadow-lg w-full">
        {loading ? (
          <p>Cargando frase del día...</p>
        ) : (
          <>
            <p className="text-xl text-center">{phrase}</p>
            <p className="text-sm font-bold text-center">{author}</p>
          </>
        )}
      </div>
    </>
  );

}
