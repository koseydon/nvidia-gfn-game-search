import React, { useEffect } from "react";
import View from "./components/View";
import { inject, observer } from "mobx-react";
import Search from "./components/Search";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const App = observer(({ Store }) => {
  useEffect(() => {
    Store.fetchGames();
  }, []);

  return (
    <div className="App">
      <Container>
        <Grid>
          <Search />
          <View />
        </Grid>
      </Container>
    </div>
  );
});

export default inject((stores) => ({
  Store: stores.Store,
}))(App);
