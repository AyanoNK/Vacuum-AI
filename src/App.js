import "./App.css";
import { makeStyles } from "@material-ui/styles";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import DirtyImage from "./img/QP290.png";
import VacuumImage from "./img/vacuum.png";

const useStyles = makeStyles({
  root: {
    backgroundColor: "rgb(173, 216, 230)",
  },
  submitButton: {
    borderRadius: 20,
    boxShadow: "0.3rem 0.3rem 0.5rem 0 black",
    marginTop: "1rem",
  },
  playbox: {
    border: "1px solid black",
    height: "40em",
    width: "100%",
    display: "block",
  },
  innerPlaybox: {
    border: "1px solid black",
    minHeight: "40em",
    minWidth: "50%",
    display: "block",
  },
  dirtyImage: {
    maxWidth: "40rem",
  },
  vaccumImage: {
    position: "absolute",
    maxWidth: "10rem",
  },
});

function App() {
  const classes = useStyles();

  const [leftDirty, setLeftDirty] = useState(true);
  const [rightDirty, setRightDirty] = useState(true);
  const [vacuumPosition, setVacuumPosition] = useState("left");
  const [triesAttempt, setTriesAttempt] = useState(0);

  const addLeftDirt = () => {
    setLeftDirty(true);
    if (vacuumPosition === null) setVacuumPosition("left");
  };
  const addRightDirt = () => {
    setRightDirty(true);
    if (vacuumPosition === null) setVacuumPosition("right");
  };

  useEffect(() => {
    setTimeout(() => {
      if (vacuumPosition === "left") {
        if (leftDirty) {
          setVacuumPosition("right");
          setLeftDirty(false);
        } else if (!rightDirty) {
          setVacuumPosition(null);
        }
        setTriesAttempt(triesAttempt + 1);
      }
      if (vacuumPosition === "right") {
        if (rightDirty) {
          setVacuumPosition("left");
          setRightDirty(false);
        } else if (!leftDirty) {
          setVacuumPosition(null);
        }
        setTriesAttempt(triesAttempt + 1);
      }
    }, 2000);
    // eslint-disable-next-line
  }, [vacuumPosition, leftDirty, rightDirty]);

  return (
    <Container className={classes.root}>
      <Grid container direction="column" spacing={3}>
        <Grid item xs={12}>
          <Grid container justifyContent="flex-start" spacing={0}>
            <Grid item xs={4}>
              <Button
                onClick={addLeftDirt}
                size="large"
                className={classes.submitButton}
              >
                Agregar suciedad a la izquierda
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={addRightDirt}
                size="large"
                className={classes.submitButton}
              >
                Agregar suciedad a la izquierda
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.playbox}>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={3} className={classes.innerPlaybox}>
                {vacuumPosition === "left" && (
                  <img
                    src={VacuumImage}
                    alt="vacuum"
                    className={classes.vaccumImage}
                  />
                )}
                {leftDirty && (
                  <img
                    src={DirtyImage}
                    alt="dirtyImage"
                    className={classes.dirtyImage}
                  />
                )}
              </Grid>
              <Grid item xs={3} className={classes.innerPlaybox}>
                {vacuumPosition === "right" && (
                  <img
                    src={VacuumImage}
                    alt="vacuum"
                    className={classes.vaccumImage}
                  />
                )}
                {rightDirty && (
                  <img
                    src={DirtyImage}
                    alt="dirtyImage"
                    className={classes.dirtyImage}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Grid item xs={6}>
              <Typography>Intentos:</Typography>
              <Typography>{triesAttempt}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Posición de la aspiradora: </Typography>
              <Typography>{vacuumPosition}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
