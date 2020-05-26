import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { inject, observer } from "mobx-react";

const useStyles = makeStyles({
  field: {
    marginTop: 50,
    marginBottom: 50,
  },
});

const Search = observer(({ Store }) => {
  const classes = useStyles();

  return (
    <>
      <TextField
        className={classes.field}
        fullWidth
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            Store.filterGames(e.target.value);
          }
        }}
      />
    </>
  );
});

export default inject((stores) => ({
  Store: stores.Store,
}))(Search);
