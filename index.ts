import * as express from "express";
import * as path from "path";
import { jugadores } from "./dummy-data/jugadores";
import { roundNumber } from "./tools/roundNumber";

const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 8081;

app.get("/", (req, res) => {
  res.json({ msg: "Hello world" });
});

app.get("/api/getAllSoccerPlayers", (req, res) => {
  const query = req.query["q"] ? (req.query["q"] as string) : "";
  const page = !isNaN(Number(req.query["page"]))
    ? Number(req.query["page"]) - 1
    : 0;
  const show = !isNaN(Number(req.query["show"]))
    ? Number(req.query["show"])
    : 10;
  const start = page * show; // offset
  const end = start + show; // take

  if (query) {
    const filteredPlayers = jugadores.filter((jugador) =>
      jugador.nombre.toLowerCase().includes(query.toLowerCase())
    );

    res.json({
      jugadores: filteredPlayers.slice(start, end),
      paginations: roundNumber(filteredPlayers.length / show),
      total_items: filteredPlayers.length,
    });

    return;
  }

  res.json({
    jugadores: jugadores.slice(start, end),
    paginations: roundNumber(jugadores.length / show),
    total_items: jugadores.length,
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
