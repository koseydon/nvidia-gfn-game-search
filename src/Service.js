import axios from "axios";

function GameService() {
  this.url =
    "https://static.nvidiagrid.net/supported-public-game-list/gfnpc.json?JSON";

  this.get = async () => {
    let response = await axios.get(`${this.url}`);

    let result = response.data;
    result.forEach((i) => {
      let steamId = i.steamUrl.slice(35);
      i.image = `https://steamcdn-a.akamaihd.net/steam/apps/${steamId}/header.jpg`;
    });

    return result;
  };
}

export default new GameService();
