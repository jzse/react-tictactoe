import React from 'react';
import Board from './Board';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const winningLine = lines.find((line) => {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return true;
    }
    return false;
  });
  if (!winningLine) {
    return null;
  }
  return {
    winningSquares: winningLine,
    winningPlayer: squares[winningLine[0]],
  };
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          moveLocation: '',
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      isMovesSortReversed: false,
    };
  }
  handleClick(i) {
    var history = this.state.history.slice(0, this.state.stepNumber + 1);
    var current = history[history.length - 1];
    const squares = current.squares.slice();

    // Record the move location history for display.
    // Square position 6 (bottom-left) is equivalent to (1, 3).
    // Use the shared state squares width dimension as rowWidth.
    const rowWidth = Math.sqrt(this.state.history[0].squares.length);
    const moveLocation = [i % rowWidth + 1, Math.floor(i / rowWidth + 1)].join(', ');

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([
        {
          squares,
          moveLocation,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: !(step % 2),
    });
  }
  changeMovesSort(isMovesSortReversed) {
    this.setState({
      isMovesSortReversed: !isMovesSortReversed,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = `Winner: ${winner.winningPlayer}`;
    } else if (this.state.stepNumber === 9) {
      status = 'Draw';
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    const moves = history.map((step, move) => {
      const desc = move ? `Move #${move} (${step.moveLocation})` : 'Game start';
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            className={this.state.stepNumber === move ? 'button--link strong' : 'button--link'}
          >
            {desc}
          </button>
        </li>
      );
    });

    const { isMovesSortReversed } = this.state;
    return (
      <div className="game">
        <div>
          <Board
            winningSquares={winner && winner.winningSquares}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol reversed={isMovesSortReversed ? 'reversed' : ''}>
            {isMovesSortReversed ? moves.reverse() : moves}
          </ol>

          <p><strong>Sort: </strong>{isMovesSortReversed ? 'Descending' : 'Ascending'}</p>
          <button onClick={() => this.changeMovesSort(isMovesSortReversed)}>
            Toggle Sort
          </button>
        </div>
      </div>
    );
  }
}
export default Game;
