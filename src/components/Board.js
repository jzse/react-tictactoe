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
export default Board;
