import React from 'react';
import PropTypes from 'prop-types';
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
  winner: PropTypes.bool,
  reset: PropTypes.func
}
function Board(props) {
  let nextHtml = undefined;
  if (props.winner) {
    nextHtml = <>恭喜{props.winner}获胜！<button onClick={props.reset}>重置</button></>;
  } else if(!Object.values(props.values).includes(undefined)) {
    nextHtml = <>平局！<button onClick={props.reset}>重置</button></>;
  } else {
    nextHtml = <>下一步是：{props.isNextX ? "X" : "O"}</>;
  }
  return (
    <div className={styles.board}>
      <div className={styles.next}>{nextHtml}</div>
      {Object.keys(props.values).map((key) => (
        <Square
          key={key}
          handleSquareClick={() => {
            props.handleSquareClick(key);
          }}
          value={props.values[key]}
        />
      ))}
    </div>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  handleSquareClick: PropTypes.func,
}
function Square(props) {
  return (
    <div className={styles.square} onClick={props.handleSquareClick}>
      {props.value}
    </div>
  );
}

export default Game;
