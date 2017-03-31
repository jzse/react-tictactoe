import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  const classNames = `square ${props.winnerClass}`;
  return (
    <button className={classNames} onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const { squares, winningSquares } = this.props;
    return (
      <Square
        value={squares[i]}
        winnerClass={winningSquares && winningSquares.includes(i) ? 'square--winner' : ''}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    // Based on previous hardcoded values of Game state.squares: [0,1,2,3,4,5,6,7,8]
    // Output squares in the format [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
    const rowWidth = Math.sqrt(this.props.squares.length);
    let rows = [];
    for (let i = 0; i < rowWidth; i++) {
      let rowCells = [];
      for (let j = 0; j < rowWidth; j++) {
        const cell = rowWidth * i + j;
        rowCells.push(<span key={cell}>{this.renderSquare(cell)}</span>);
      }
      rows.push(<div className="board-row" key={i}>{rowCells}</div>);
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
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
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    const moves = history.map((step, move) => {
      const desc = move ? `Move #${move} (${step.moveLocation})` : 'Game start';
      return (
        <li key={move}>
          <a
            href="#"
            onClick={() => this.jumpTo(move)}
            className={this.state.stepNumber === move ? 'strong' : ''}
          >
            {desc}
          </a>
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

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winningSquares: lines[i],
        winningPlayer: squares[a],
      };
    }
  }
  return null;
}

export default Game;
