import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.css";
import { getInitItems, calculateWinner } from "./share";

function Game() {
  const [isNextX, setIsNextX] = React.useState(false);
  const [values, setValues] = React.useState(getInitItems());
  const [winner, setWinner] = React.useState(undefined);
  React.useEffect(() => {
    setWinner(calculateWinner(values));
  }, [values]);
  function handleSquareClick(i) {
    if (values[i] || winner) return;
    isNextX ? changeValue(i, "X") : changeValue(i, "O");
    setIsNextX(!isNextX);
  }
  function changeValue(index, value) {
    setValues(Object.assign({}, values, { [index]: value }));
  }
  function reset() {
    setValues(getInitItems());
    setWinner(undefined);
  }
  return (
    <div className={styles.game}>
      <Board
        values={values}
        handleSquareClick={handleSquareClick}
        isNextX={isNextX}
        winner={winner}
        reset={reset}
      ></Board>
    </div>
  );
}

Board.propTypes = {
  values: PropTypes.object,
  handleSquareClick: PropTypes.func,
  isNextX: PropTypes.bool,
  winner: PropTypes.string,
  reset: PropTypes.func,
};
function Board({ values, handleSquareClick, isNextX, winner, reset }) {
  function Tip() {
    if (winner) {
      return (
        <>
          恭喜{winner}获胜！<button onClick={reset}>重置</button>
        </>
      );
    } else if (!Object.values(values).includes(undefined)) {
      return (
        <>
          平局！<button onClick={reset}>重置</button>
        </>
      );
    } else {
      return <>下一步是：{isNextX ? "X" : "O"}</>;
    }
  }
  return (
    <div className={styles.board}>
      <div className={styles.tip}>
        <Tip />
      </div>
      {Object.keys(values).map((key) => (
        <Square
          key={key}
          handleSquareClick={() => {
            handleSquareClick(key);
          }}
          value={values[key]}
        />
      ))}
    </div>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  handleSquareClick: PropTypes.func,
};
function Square({ value, handleSquareClick }) {
  return (
    <div className={styles.square} onClick={handleSquareClick}>
      {value}
    </div>
  );
}

export default Game;
