import { action, decorate, observable, runInAction } from "mobx";

import GameService from "./Service";

function Store() {
  this.gameName = [];
  this.gamesList = [];
  this.resultList = [];
  this.GameService = GameService;

  this.updateGameName = (gameName) => {
    this.gameName = gameName;
  };

  this.filterGames = (gameName) => {
    if (gameName) {
      let result = this.gamesList.filter((i) =>
        i.title.toLowerCase().includes(gameName)
      );
      if (result.length !== 0) {
        result.forEach((i) => {
          let steamId = i.steamUrl.slice(35);
          i.image = `https://steamcdn-a.akamaihd.net/steam/apps/${steamId}/header.jpg`;
        });
        this.resultList = result;
      } else {
        this.resultList = [];
        this.resultList.push({
          title:
            "The game that you are looking for not available on Nvidia Now yet!",
          steamUrl: false,
          show: true,
        });
      }
    } else {
      this.resultList = this.gamesList;
    }
  };

  this.fetchGames = async () => {
    try {
      const result = await this.GameService.get();
      runInAction(() => {
        this.gamesList = result;
        this.resultList = result;
      });
    } catch (err) {
      runInAction(() => {
        console.log(err);
      });
    }
  };
}

decorate(Store, {
  filterGames: action,
  fetchGames: action,
  updateGameName: action,
  resultList: observable,
  gamesList: observable,
  gameName: observable,
});

export default new Store();
