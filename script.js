const board = document.querySelector('#board');

const setSquares = (row) => {
    for (let i = 0; i < 8; i++) {
        const square = document.createElement('div');
        square.setAttribute('class', `square row-${row}`)
        board.append(square)

    }
}
for (let i = 0; i < 8; i++) {
    setSquares(i)
}
// 2d array
const s = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];
// collection of all the squares
let arr = s.map((el, i) => {

    return [...document.querySelectorAll(`.row-${i}`)]
})
// set color
for (let i = 0; i < arr.length; i++) {
    for (let x = 0; x < arr[i].length; x++) {
        if (i % 2 > 0) {
            if (x % 2 > 0) {
                arr[i][x].setAttribute('style', 'background-color:lightblue')
            } else {
                arr[i][x].setAttribute('style', 'background-color:white')
            }
        } else {
            if (x % 2 == 0) {
                arr[i][x].setAttribute('style', 'background-color:lightblue')
            } else {
                arr[i][x].setAttribute('style', 'background-color:white')
            }

        }
    }

}

//console.log(arr); collection of pieces color , type and links to images
const boardPieces = [
    {
        code: 0,
        name: 'king',
        color: 'black',
        link: 'https://cdn-icons-png.flaticon.com/512/138/138439.png'
    }, {
        code: 1,
        name: 'king',
        color: 'white',
        link: 'https://cdn-icons-png.flaticon.com/512/138/138391.png'
    }, {
        code: 2,
        name: 'queen',
        color: 'black',
        link: 'https://cdn-icons-png.flaticon.com/512/44/44502.png'
    }, {
        code: 3,
        name: 'queen',
        color: 'white',
        link: 'https://cdn-icons-png.flaticon.com/512/2774/2774380.png'
    }, {
        code: 4,
        name: 'bishop',
        color: 'black',
        link: 'https://cdn-icons-png.flaticon.com/512/5077/5077021.png'
    }, {
        code: 5,
        name: 'bishop',
        color: 'white',
        link: 'https://cdn-icons-png.flaticon.com/512/5077/5077028.png'
    }, {
        code: 6,
        name: 'knight',
        color: 'black',
        link: 'https://cdn-icons-png.flaticon.com/512/1342/1342584.png'
    }, {
        code: 7,
        name: 'knight',
        color: 'white',
        link: 'https://cdn-icons-png.flaticon.com/512/1342/1342635.png'
    }, {
        code: 8,
        name: 'rook',
        color: 'black',
        link: 'https://cdn-icons-png.flaticon.com/512/1626/1626883.png'
    }, {
        code: 9,
        name: 'rook',
        color: 'white',
        link: 'https://cdn-icons-png.flaticon.com/512/1626/1626848.png'
    }, {
        code: 10,
        name: 'pawn',
        color: 'black',
        link: 'https://cdn-icons-png.flaticon.com/512/657/657487.png'
    }, {
        code: 11,
        name: 'pawn',
        color: 'white',
        link: 'https://cdn-icons-png.flaticon.com/512/657/657588.png'
    }
];
// set the inetial board pawns
const setPawnsPosetions = (row, color, pieceIndex, className) => {
    for (let i = 0; i < 8; i++) {
        const img = document.createElement('img');
        img.setAttribute(
            'src',
            color == 'black'
                ? boardPieces[pieceIndex].link
                : boardPieces[pieceIndex + 1].link
        );
        img.setAttribute('class', `piece ${className} ${color}`)
        row[i].append(img)
    }
}
setPawnsPosetions(arr[1], 'black', 10, 'pawn')
setPawnsPosetions(arr[6], 'white', 10, 'pawn')

// set the inetial board pices
const setPieces = (row, color, index, pieceIndex, className) => {
    const img = document.createElement('img');
    img.setAttribute(
        'src',
        color == 'black'
            ? boardPieces[pieceIndex].link
            : boardPieces[pieceIndex + 1].link
    );
    img.setAttribute('class', `piece ${className} ${color}`)
    row[index].append(img)
}
// a callback to set the inetial board
const firstBoard = [
    [
        arr[0], 'black', 3, 0, 'king'
    ],
    [
        arr[7], 'white', 3, 0, 'king'
    ],
    [
        arr[0], 'black', 4, 2, 'queen'
    ],
    [
        arr[7], 'white', 4, 2, 'queen'
    ],
    [
        arr[0], 'black', 5, 4, 'bishop'
    ],
    [
        arr[0], 'black', 2, 4, 'bishop'
    ],
    [
        arr[7], 'white', 5, 4, 'bishop'
    ],
    [
        arr[7], 'white', 2, 4, 'bishop'
    ],
    [
        arr[0], 'black', 6, 6, 'knight'
    ],
    [
        arr[0], 'black', 1, 6, 'knight'
    ],
    [
        arr[7], 'white', 6, 6, 'knight'
    ],
    [
        arr[7], 'white', 1, 6, 'knight'
    ],
    [
        arr[0], 'black', 7, 8, 'rook'
    ],
    [
        arr[0], 'black', 0, 8, 'rook'
    ],
    [
        arr[7], 'white', 7, 8, 'rook'
    ],
    [
        arr[7], 'white', 0, 8, 'rook'
    ]
]
firstBoard.forEach(el => {
    setPieces(el[0], el[1], el[2], el[3], el[4])
})

board.addEventListener('click', (e) => {
    let current = e.target;
    //console.log(current)
    if (current.classList[2] == "marked-empty") {
        moveToMarkedEmpty(current, arr)

    }
    if (current.parentNode.classList[2] == "marked-enemy") {
        moveToMarkedEnemy(current, arr)

    }
    if(current.parentNode){
        if(!current.parentNode.classList[2]){
        switch (current.classList[1]) {
        case 'pawn':
            pawnsMove(current, arr, current.classList[2])
            break;
        case 'rook':
            rookMove(current, arr, current.classList[2])
            break;
        case 'knight':
            knightMove(current, arr, current.classList[2])
            break;
        case 'bishop':
            bishopMove(current, arr, current.classList[2])
            break;
        case 'queen':
            queenMove(current, arr, current.classList[2])
            break;
        case 'king':
            kingMove(current, arr, current.classList[2])
            break;
        default:
            classRemover()
            break;
    }
        //console.log(current.parentNode.classList)
    }
    }
    
    
})

const pawnsMove = (e, arr, color) => {
    classRemover()
    for (let i = 0; i < 8; i++) { // enter rows
        for (let x = 0; x < 8; x++) { // enter columns
            if (arr[i][x] === e.parentNode) {
                if (color === 'black') {
                    addSelectedClass(arr, i, x, color)
                    twoMovesBlack(arr, i, x, color)
                } else {
                    addSelectedClass(arr, i, x, color)
                    twoMovesWhite(arr, i, x, color)
                }
            }
        }
    }

}

const rookMove = (e, arr, color) => {
    classRemover()
    for (let i = 0; i < 8; i++) {
        for (let x = 0; x < 8; x++) {
            if (arr[i][x] === e.parentNode) {
                addSelectedClass(arr, i, x, color)
                verticalMoves(arr, i, x, color)
                horizontalMoves(arr, i, x, color)
                verticalTargets(arr, i, x, color)
                horizintalTargets(arr, i, x, color)
            }
        }
    }
}

const knightMove = (e, arr, color) => {
    classRemover()
    for (let i = 0; i < 8; i++) {
        for (let x = 0; x < 8; x++) {
            if (arr[i][x] === e.parentNode) {
                addSelectedClass(arr, i, x, color)
                jumpingMoves(arr, i, x, color)
                jumpingTargets(arr, i, x, color)
            }
        }
    }
}

const bishopMove = (e, arr, color) => {
    classRemover()
    for (let i = 0; i < 8; i++) {
        for (let x = 0; x < 8; x++) {
            if (arr[i][x] === e.parentNode) {
                addSelectedClass(arr, i, x, color)
                diagonalMoves(arr, i, x, color)
                diagonaTargets(arr, i, x, color)
            }
        }
    }
}

const queenMove = (e, arr, color) => {
    classRemover()
    for (let i = 0; i < 8; i++) {
        for (let x = 0; x < 8; x++) {
            if (arr[i][x] === e.parentNode) {
                addSelectedClass(arr, i, x, color)
                diagonalMoves(arr, i, x, color)
                diagonaTargets(arr, i, x, color)
                verticalMoves(arr, i, x, color)
                horizontalMoves(arr, i, x, color)
                verticalTargets(arr, i, x, color)
                horizintalTargets(arr, i, x, color)
            }
        }
    }
}

const kingMove = (e, arr, color) => {
    classRemover()
    for (let i = 0; i < 8; i++) {
        for (let x = 0; x < 8; x++) {
            if (arr[i][x] === e.parentNode) {
                kingAllowedSquares(arr, i, x, color)
                addSelectedClass(arr, i, x, color)
                kingTargets(arr, i, x, color)
            }
        }
    }
}

const countDown = (start, end) => {
    let arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i)
    }
    return arr
}
const countUp = (start, end) => {
    let arr = [];
    if (start === 0) {
        return arr
    }
    for (let i = start; i >= end; i--) {
        arr.push(i)
    }
    return arr
}

const moveToMarkedEmpty = (e, arr) => {
    const marked = [];
    for (let i = 0; i < 8; i++) {
        for (let x = 0; x < 8; x++) {
            if (arr[i][x].firstChild) {

                if (arr[i][x].classList[2] == 'marked') {
                    let first = arr[i][x]
                        .firstChild
                        marked
                        .push(first)

                    arr[i][x].removeChild(first)
                    e.append(marked[0])
                    i = 0
                }

            }
            arr[i][x]
                .classList
                .remove('marked-empty')
            arr[i][x]
                .classList
                .remove('marked')
        }
    }
    classRemover()

}

const moveToMarkedEnemy = (e, board) => {
     
    const current = [];
    const parent = e.parentNode;
    for (let i = 0; i < 8; i++) {
        for (let x = 0; x < 8; x++) {
            if (arr[i][x].firstChild) {
                if(arr[i][x].classList[2] === "marked"){
                    current.push(arr[i][x].firstChild)
                }
            }}}
    parent.append(...current)
    parent.removeChild(e)
           
     console.log(current)
           classRemover()
}

const classRemover = () => {
    for (let i = 0; i < 8; i++) { // enter rows
        for (let x = 0; x < 8; x++) {
            arr[i][x]
                .classList
                .remove("marked-empty")
            arr[i][x]
                .classList
                .remove("marked")
            arr[i][x]
                .classList
                .remove("marked-enemy")
        }
    }
}

const addSelectedClass = (board, x, y) => {
    board[x][y]
        .classList
        .add('marked')
}
// pawns allowed movments
const twoMovesBlack = (board, row, col, color) => {
    !board[row + 1][col].firstChild && board[row + 1][col]
        .classList
        .add("marked-empty");
    if (row === 1 && !board[row + 1][col].firstChild) {
        !board[row + 2][col].firstChild && board[row + 2][col]
            .classList
            .add("marked-empty");
    }
    blackPawnTargets(board, row, col, color)
}
const twoMovesWhite = (board, row, col, color) => {
    !board[row - 1][col].firstChild && board[row - 1][col]
        .classList
        .add("marked-empty");
    if (row === 6 && !board[row - 1][col].firstChild) {
        !board[row - 2][col].firstChild && board[row - 2][col]
            .classList
            .add("marked-empty");
    }
    whitePawnTargets(board, row, col, color)
}
const blackPawnTargets = (board, row, col, color) => {
    if (
        board[row + 1][col + 1]
            ?.firstChild
    ) {
        if (board[row + 1][col + 1].firstChild.classList[2] != color) {
            board[row + 1][col + 1]
                .classList
                .add('marked-enemy');
        }
    }
    if (
        board[row + 1][col - 1]
            ?.firstChild
    ) {
        if (
            board[row + 1][col - 1]
                ?.firstChild.classList[2] != color
        ) {
            board[row + 1][col - 1]
                .classList
                .add('marked-enemy');
        }
    }

    //console.log(board[row + 1][col + 1].firstChild.classList[2])
}
const whitePawnTargets = (board, row, col, color) => {
    if (
        board[row - 1][col - 1]
            ?.firstChild
    ) {
        if (board[row - 1][col - 1].firstChild.classList[2] != color) {
            board[row - 1][col - 1]
                .classList
                .add('marked-enemy');
        }
    }
    if (
        board[row - 1][col + 1]
            ?.firstChild
    ) {
        if (
            board[row - 1][col + 1]
                ?.firstChild.classList[2] != color
        ) {
            board[row - 1][col + 1]
                .classList
                .add('marked-enemy');
        }
    }
}

// rook allowed moves

const verticalMoves = (board, row, col, color) => {
    for (let i = row + 1; i < 8; i++) {
        if (!board[i][col].firstChild) {
            board[i][col]
                .classList
                .add("marked-empty");
        } else {
            break
        }

    }
    for (let i = row - 1; i >= 0; i--) {

        if (!board[i][col].firstChild) {
            board[i][col]
                .classList
                .add("marked-empty");
        } else {
            break
        }
    }
}

const horizontalMoves = (board, row, col, color) => {
    //console.log(row,col)
    for (let i = col + 1; i < 8; i++) {
        if (!board[row][i].firstChild) {
            //console.log(i)
            board[row][i]
                .classList
                .add("marked-empty");
        } else {
            break
        }

    }
    for (let i = col - 1; i >= 0; i--) {

        if (!board[row][i].firstChild) { //console.log(i)
            board[row][i]
                .classList
                .add("marked-empty");
        } else {
            break
        }

    }
}

// rook targets

const verticalTargets = (board, row, col, color) => {
    for (let i = row + 1; i < 8; i++) {
        if (board[i][col].firstChild) {
            if (board[i][col].firstChild.classList[2] !== color) {
                
                board[i][col]
                    .classList
                    .add("marked-enemy");

            }
            break;
        }

    }
    for (let i = row - 1; i > 0; i--) {
        if (board[i][col].firstChild) {
            //console.log('true2',row,col,i)
            if (board[i][col].firstChild.classList[2] !== color) {
                console.log('true2 color', board[i][col].firstChild.classList[2])
                board[i][col]
                    .classList
                    .add("marked-enemy");

            }
            break;
        }

    }
}

const horizintalTargets = (board, row, col, color) => {
    for (let i = col + 1; i < 8; i++) {
        if (board[row][i].firstChild) {
            if (board[row][i].firstChild.classList[2] !== color) {
                
                board[row][i]
                    .classList
                    .add("marked-enemy");

            }
            break;
        }

    }
    for (let i = col - 1; i >= 0; i--) {
        if (board[row][i].firstChild) {
            //console.log('true2',row,col,i)
            if (board[row][i].firstChild.classList[2] !== color) {
                
                board[row][i]
                    .classList
                    .add("marked-enemy");

            }
            break;
        }

    }
}

// knight allowed moves

const jumpingMoves = (board, row, col, color) => {
    if (
        row < 6 && col < 7 && !board[row + 2][col + 1]
            ?.firstChild
    ) {
        board[row + 2][col + 1]
            .classList
            .add('marked-empty')
    }

    if (
        row < 6 && col > 0 && !board[row + 2][col - 1]
            ?.firstChild
    ) {
        board[row + 2][col - 1]
            .classList
            .add('marked-empty')
    }

    // up the board

    if (
        row > 1 && col > 0 && !board[row - 2][col - 1]
            ?.firstChild
    ) {
        board[row - 2][col - 1]
            .classList
            .add('marked-empty')
    }

    if (
        row > 1 && col < 7 && !board[row - 2][col + 1]
            ?.firstChild
    ) {
        board[row - 2][col + 1]
            .classList
            .add('marked-empty')
    }

    // left the board

    if (
        row > 0 && col > 1 && !board[row - 1][col - 2]
            ?.firstChild
    ) {
        board[row - 1][col - 2]
            .classList
            .add('marked-empty')
    }

    if (
        row < 7 && col > 1 && !board[row + 1][col - 2]
            ?.firstChild
    ) {
        board[row + 1][col - 2]
            .classList
            .add('marked-empty')
    }

    // right the board

    if (row > 0 && col < 6 && !board[row - 1][col + 2].firstChild) {
        board[row - 1][col + 2]
            .classList
            .add('marked-empty')
    }

    if (
        row < 7 && col < 6 && !board[row + 1][col + 2]
            ?.firstChild
    ) {
        board[row + 1][col + 2]
            .classList
            .add('marked-empty')
    }

}

const jumpingTargets = (board, row, col, color) => {
    if (
        row < 6 && col < 7 && board[row + 2][col + 1]
            ?.firstChild
    ) {
        if (board[row + 2][col + 1].firstChild.classList[2] !== color) {
            board[row + 2][col + 1]
                .classList
                .add('marked-enemy')
        }

    }

    if (
        row < 6 && col > 0 && board[row + 2][col - 1]
            ?.firstChild
    ) {
        if (board[row + 2][col - 1].firstChild.classList[2] !== color) {
            board[row + 2][col - 1]
                .classList
                .add('marked-enemy')
        }

    }

    // up the board

    if (
        row > 1 && col > 0 && board[row - 2][col - 1]
            ?.firstChild
    ) {
        if (board[row - 2][col - 1].firstChild.classList[2] !== color) {
            board[row - 2][col - 1]
                .classList
                .add('marked-enemy')
        }

    }

    if (
        row > 1 && col < 7 && board[row - 2][col + 1]
            ?.firstChild
    ) {
        if (board[row - 2][col + 1].firstChild.classList[2] !== color) {
            board[row - 2][col + 1]
                .classList
                .add('marked-enemy')
        }

    }

    // left the board

    if (
        row > 0 && col > 1 && board[row - 1][col - 2]
            ?.firstChild
    ) {
        if (board[row - 1][col - 2].firstChild.classList[2] !== color) {
            board[row - 1][col - 2]
                .classList
                .add('marked-enemy')
        }

    }

    if (
        row < 7 && col > 1 && board[row + 1][col - 2]
            ?.firstChild
    ) {
        if (board[row + 1][col - 2].firstChild.classList[2] !== color) {
            board[row + 1][col - 2]
                .classList
                .add('marked-enemy')
        }

    }

    // right the board

    if (row > 0 && col < 6 && board[row - 1][col + 2].firstChild) {
        if (board[row - 1][col + 2].firstChild.classList[2] !== color) {
            board[row - 1][col + 2]
                .classList
                .add('marked-enemy')
        }

    }

    if (
        row < 7 && col < 6 && board[row + 1][col + 2]
            ?.firstChild
    ) {
        if (board[row + 1][col + 2].firstChild.classList[2] !== color) {
            board[row + 1][col + 2]
                .classList
                .add('marked-enemy')
        }

    }

}

// bishop allowed moves

const diagonalMoves = (board, row, col, color) => {
    for (let i = 0; i < 7; i++) {
        let newRow = row - 1 - i;
        let newCol = col + 1 + i;
        if (newRow >= 0 && newCol <= 7) {
            if (!board[newRow][newCol].firstChild) {
                board[newRow][newCol]
                    .classList
                    .add('marked-empty')
            } else break
        }
    }
    for (let i = 0; i < 7; i++) {
        let newRow = row - 1 - i;
        let newCol = col - 1 - i;
        if (newRow >= 0 && newCol >= 0) {
            if (!board[newRow][newCol].firstChild) {
                board[newRow][newCol]
                    .classList
                    .add('marked-empty')
            } else break
        }
    }
    for (let i = 0; i < 7; i++) {
        let newRow = row + 1 + i;
        let newCol = col - 1 - i;
        if (newRow <= 7 && newCol >= 0) {
            if (!board[newRow][newCol].firstChild) {
                board[newRow][newCol]
                    .classList
                    .add('marked-empty')
            } else break
        }
    }
    for (let i = 0; i < 7; i++) {
        let newRow = row + 1 + i;
        let newCol = col + 1 + i;
        if (newRow <= 7 && newCol <= 7) {
            if (!board[newRow][newCol].firstChild) {
                board[newRow][newCol]
                    .classList
                    .add('marked-empty')
            } else break
        }
    }
}

// bishop targets

const diagonaTargets = (board, row, col, color) => {
    for (let i = 0; i < 7; i++) {
        let newRow = row - 1 - i;
        let newCol = col + 1 + i;
        if (newRow >= 0 && newCol <= 7) {
            if (board[newRow][newCol].firstChild) {

                if (board[newRow][newCol].firstChild.classList[2] !== color) {
                    board[newRow][newCol]
                        .classList
                        .add('marked-enemy');
                    break;
                } else break;

                }
            
        }
    }
    for (let i = 0; i < 7; i++) {
        let newRow = row - 1 - i;
        let newCol = col - 1 - i;
        if (newRow >= 0 && newCol >= 0) {
            if (board[newRow][newCol].firstChild) {

                if (board[newRow][newCol].firstChild.classList[2] !== color) {
                    board[newRow][newCol]
                        .classList
                        .add('marked-enemy');
                    break;
                } else break;
                }
            }
    }
    for (let i = 0; i < 7; i++) {
        let newRow = row + 1 + i;
        let newCol = col - 1 - i;
        if (newRow <= 7 && newCol >= 0) {
            if (board[newRow][newCol].firstChild) {

                if (board[newRow][newCol].firstChild.classList[2] !== color) {
                    board[newRow][newCol]
                        .classList
                        .add('marked-enemy');
                    break;
                } else break;
                }
            }
    }
    for (let i = 0; i < 7; i++) {
        let newRow = row + 1 + i;
        let newCol = col + 1 + i;
        if (newRow <= 7 && newCol <= 7) {
            if (board[newRow][newCol].firstChild) {

                if (board[newRow][newCol].firstChild.classList[2] !== color) {
                    board[newRow][newCol]
                        .classList
                        .add('marked-enemy');
                    break;
                } else break;
                }
            }
    }
}

// king allowed moves

const kingAllowedSquares = (board, row, col, color) =>{
    let kingSquares = [];
    let blackPieces = [];
    let whitePieces = [];
   
    if(row > 0 && col > 0){
        !board[row-1][col-1].firstChild && kingSquares.push(board[row-1][col-1])
        !board[row-1][col].firstChild && kingSquares.push(board[row-1][col])
    }
    if(row > 0 && col < 7){
        !board[row-1][col+1].firstChild && kingSquares.push(board[row-1][col+1])
    }
    if(col < 7){
        !board[row][col+1].firstChild && kingSquares.push(board[row][col+1])
    }
    if(col > 0){
        !board[row][col-1].firstChild && kingSquares.push(board[row][col-1])
    }
    if(row < 7 && col > 0){
        !board[row+1][col-1].firstChild && kingSquares.push(board[row+1][col-1])
        !board[row+1][col].firstChild && kingSquares.push(board[row+1][col])
        !board[row+1][col+1].firstChild && kingSquares.push(board[row+1][col+1])
    }

    if(color === 'white' && kingSquares.length){
        for(let i = 0; i < 8; i++){
            for(let x = 0; x < 8; x++){
                if(board[i][x]?.firstChild){
                    if(board[i][x]?.firstChild.classList[2] !== color){
                       blackPieces.push(board[i][x]) 
                    }
                    
                }//console.log(blackPieces)
            }
        }
    }
    if(color === 'black' && kingSquares.length){
        for(let i = 0; i < 8; i++){
            for(let x = 0; x < 8; x++){
                if(board[i][x]?.firstChild){
                    if(board[i][x]?.firstChild.classList[2] !== color){
                       whitePieces.push(board[i][x]) 
                    }
                    
                }//console.log(whitePieces)
            }
        }
    }
    if(kingSquares.length){
        let enemyPieces = whitePieces.length ? whitePieces : blackPieces ;
        //console.log(enemyPieces[1].firstChild.classList)
        for (let i = 0; i < enemyPieces.length; i++){
            let current = enemyPieces[i].firstChild
            switch (current.classList[1]) {
                case 'pawn':
                    pawnsMove(current, board, color)
                    break;
                case 'rook':
                    rookMove(current, board, color)
                    break;
                case 'knight':
                    knightMove(current, board, color)
                    break;
                case 'bishop':
                    bishopMove(current, board, color)
                    break;
                case 'queen':
                    queenMove(current, board, color)
                    break;
                
            }
               
        }
    }
    let newSquares = kingSquares.filter(el => !el.classList[2])
    classRemover()
   //bishopMove()
    if(kingMove.length){
        newSquares.forEach(el => {
            el.classList.add('marked-empty')
        })
    }
   //console.log(newSquares)
   
}

const kingTargets = (board,row,col,color) => {
    let kingSquares = [];
    
    if(row > 0 && col > 0){
        board[row-1][col-1].firstChild && kingSquares.push(board[row-1][col-1])
        board[row-1][col].firstChild && kingSquares.push(board[row-1][col])
    }
    if(row > 0 && col < 7){
        board[row-1][col+1].firstChild && kingSquares.push(board[row-1][col+1])
    }
    if(col < 7){
        board[row][col+1].firstChild && kingSquares.push(board[row][col+1])
    }
    if(col > 0){
        board[row][col-1].firstChild && kingSquares.push(board[row][col-1])
    }
    if(row < 7 && col > 0){
        board[row+1][col-1].firstChild && kingSquares.push(board[row+1][col-1])
        board[row+1][col].firstChild && kingSquares.push(board[row+1][col])
        board[row+1][col+1].firstChild && kingSquares.push(board[row+1][col+1])
    }
    kingSquares = kingSquares.filter(el => {
        return el.firstChild.classList[2] !== color 
    })
    if(kingSquares.length){
        kingSquares.forEach(el => el.classList.add('marked-enemy'))
    }
    //console.log(kingSquares)
}