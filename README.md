# react-tictactoe

Implementation of the [Facebook React tutorial](https://github.com/facebook/react/blob/8eb7068364ce9e51450dc175e3c5d8da37accd8c/docs/tutorial/tutorial.md) with improvements.

## Improvements

1. Display the move locations in the format "(1, 3)" instead of "6". See: [#1](https://github.com/jzse/react-tictactoe/commit/ad282be58c9bbb8f66fb369d58243cdec2c68cb6)
1. Bold the currently-selected item in the move list. See: [#2](https://github.com/jzse/react-tictactoe/commit/6620363450bab48d3d865ef13b194c0a2911c41e)
1. Rewrite Board to use two loops to make the squares instead of hardcoding them. See: [#3](https://github.com/jzse/react-tictactoe/commit/16e928f033f6be9980d2ede48dd04dc048b6cb88)
1. Add a toggle button that lets you sort the moves in either ascending or descending order. See: [#4](https://github.com/jzse/react-tictactoe/commit/1d28990b0138010a7640d1a85a1de08da8ecb93b)
1. When someone wins, highlight the three squares that caused the win. See: [#5](https://github.com/jzse/react-tictactoe/commit/6ecb630f516f2aea24dcfa66bae8b94eb5d4626d)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Quick Start
```sh
cd react-tictactoe
npm install
npm start
```
Open `http://localhost:3000` to view it in your browser.
