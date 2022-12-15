import cheerio from "cheerio";

const phrase = async (req, res) => {
  const response = await fetch("http://www.frasedehoy.com/");
  const html = await response.text();
  const $ = cheerio.load(html);
  const phrase = $(".frase-big-xs").text();
  const author = $(".autor").text();
  res.json({ phrase, author });
};

export default phrase;