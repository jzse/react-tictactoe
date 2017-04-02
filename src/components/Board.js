import React from 'react';
import Square from './Square';

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
    // Based on previous hardcoded values of Game state.squares: [0, 1, 2, 3, 4, 5, 6, 7, 8]
    // Output squares in the format [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
    const rows = Array(Math.sqrt(this.props.squares.length)).fill(null);
    const cells = rows;
    const rowsWrap = rows.map((row, i) => {
      const cellsWrap = cells.map((cell, j) => {
        const square = (rows.length * i) + j;
        // TODO Refactor Square component so we can remove this renderSquare.
        return (
          <span key={square}>{this.renderSquare(square)}</span>
        );
      });
      return (
        <div className="board-row" key={i}>{cellsWrap}</div>
      );
    });
    return (
      <div>{rowsWrap}</div>
    );
  }
}
export default Board;
