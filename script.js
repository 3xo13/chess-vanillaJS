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

let arr = s.map((el, i) => {

    return [...document.querySelectorAll(`.row-${i}`)]
})

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

//console.log(arr);

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
        arr[0], 'black', 5, 4, 'pishop'
    ],
    [
        arr[0], 'black', 2, 4, 'pishop'
    ],
    [
        arr[7], 'white', 5, 4, 'pishop'
    ],
    [
        arr[7], 'white', 2, 4, 'pishop'
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

    if (current.classList[2] == "marked-empty") {

        checkMarked(current, arr)
    }

    if (current.classList[1] === 'pawn') {
        pawnsMove(current, arr, current.classList[2])
        //console.log(current.classList[2])
    }
    if (current.classList[1] === 'rook') {
        rookMove(current)
        //console.log(current.classList[2])
    }

})

const pawnsMove = (e, arr, color) => {
    classRemover()

    for (let i = 0; i < 8; i++) { // enter rows
        for (let x = 0; x < 8; x++) { // enter columns
            if (arr[i][x] === e.parentNode) {

                if (e.classList[2] === 'black') {
                    if (!arr[i][x].classList[2]) {
                        if (i === 1) {
                            arr[i][x]
                                .classList
                                .add("marked")
                            if (!arr[i + 1][x].firstChild) {
                                //console.log(arr[i+1][x])
                                arr[i + 1][x]
                                    .classList
                                    .add("marked-empty")
                            }
                            if (!arr[i + 2][x].firstChild) {
                                arr[i + 2][x]
                                    .classList
                                    .add("marked-empty")
                            }
                            //console.log(arr[i+1][x+1].classList[2])
                            if (
                                arr[i + 1][x + 1]
                                    ?.firstChild && arr[i + 1][x + 1].firstChild.classList[2] === 'white'
                            ) {
                                arr[i + 1][x + 1]
                                    .classList
                                    .add("marked-enemy")
                            }
                            if (
                                arr[i + 1][x - 1]
                                    ?.firstChild && arr[i + 1][x - 1].firstChild.classList[2] === 'white'
                            ) {
                                arr[i + 1][x - 1]
                                    .classList
                                    .add("marked-enemy")
                            }

                        }
                        if (i > 1) {
                            arr[i][x]
                                .classList
                                .add("marked")
                            if (!arr[i + 1][x].firstChild) {

                                arr[i + 1][x]
                                    .classList
                                    .add("marked-empty")
                            }
                            if (
                                arr[i + 1][x + 1]
                                    ?.firstChild && arr[i + 1][x + 1].firstChild.classList[2] === 'white'
                            ) {
                                arr[i + 1][x + 1]
                                    .classList
                                    .add("marked-enemy")
                            }
                            if (
                                arr[i + 1][x - 1]
                                    ?.firstChild && arr[i + 1][x - 1].firstChild.classList[2] === 'white'
                            ) {
                                arr[i + 1][x - 1]
                                    .classList
                                    .add("marked-enemy")
                            }
                            //arr[i+1][x].classList.add("marked-empty")
                        }

                    }
                } else {
                    console.log('on')
                    if (!arr[i][x].classList[2]) {
                        if (i === 6) {
                            arr[i][x]
                                .classList
                                .add("marked")
                            if (!arr[i - 1][x].firstChild) {
                                //console.log(arr[i-1][x])
                                arr[i - 1][x]
                                    .classList
                                    .add("marked-empty")
                            }
                            //console.log(arr[i-1][x-1].classList[2])

                            if (!arr[i - 2][x].firstChild) {
                                arr[i - 2][x]
                                    .classList
                                    .add("marked-empty")
                            }
                            if (
                                arr[i - 1][x + 1]
                                    ?.firstChild && arr[i - 1][x + 1].firstChild.classList[2] === 'black'
                            ) {
                                arr[i - 1][x + 1]
                                    .classList
                                    .add("marked-enemy");
                            }
                            if (
                                arr[i - 1][x - 1]
                                    ?.firstChild && arr[i - 1][x - 1].firstChild.classList[2] === 'black'
                            ) {
                                arr[i - 1][x - 1]
                                    .classList
                                    .add("marked-enemy")
                            }

                        }
                        if (i < 6) {
                            arr[i][x]
                                .classList
                                .add("marked")
                            if (!arr[i - 1][x].firstChild) {

                                arr[i - 1][x]
                                    .classList
                                    .add("marked-empty")
                            }
                            if (
                                arr[i - 1][x - 1]
                                    ?.firstChild
                            ) {
                                if (arr[i - 1][x - 1].firstChild.classList[2] === 'black') {
                                    arr[i - 1][x - 1]
                                        .classList
                                        .add("marked-enemy")
                                }
                            }
                            if (
                                arr[i - 1][x + 1]
                                    ?.firstChild
                            ) {
                                if (arr[i - 1][x + 1].firstChild.classList[2] === 'black') {
                                    arr[i - 1][x + 1]
                                        .classList
                                        .add("marked-enemy")
                                }
                            }

                            //arr[i+1][x].classList.add("marked-empty")
                        }

                    }
                }

            }
        }
    }
}

const rookMove = (e) => {
    classRemover()
    for (let i = 0; i < 8; i++) {
        for (let x = 0; x < 8; x++) {

            let current = e.parentNode == arr[i][x]
                ? true
                : false
            let el = arr[i][x];
            current && el
                .classList
                .add('marked')
            let downTheBoard = current && countDown(i, 8)
            let upTheBoard = current && countUp(i, 0)
            let leftTheBoard = current && countUp(x, 0)
            let rightTheBoard = current && countDown(x, 8)
            //console.log(rightTheBoard)
            if (current) {
                addClassByColumn(downTheBoard, x, e.classList[2])
                addClassByColumn(upTheBoard, x, e.classList[2])
                addClassByRow(i, leftTheBoard, e.classList[2])
               addClassByRow(i, rightTheBoard, e.classList[2])
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
const addClassByColumn = (column, row, color) => {

    for (let i = column[1]; i < column.at(-1); i++) {
        //add avaliable squares at the bottum by calling a func and adding a class
        if (!arr[i][row].firstChild) {  // if there's no piece on the square add a class
            arr[i][row]
                .classList
                .add('marked-empty')
        }
        
        if (arr[i][row]?.firstChild.classList[2] !== color) {
            //console.log(arr[i][row].classList[2])
            arr[i][row].classList.add('marked-enemy')
            // classByColor(
            //     color,
            //     arr[i][row]?.firstChild.classList[2],
            //     i,
            //     row
            // )
            
        } 
        else{
            break
        }
        
    }
    //add avaliable squares at the top right by calling a func and adding a class
    if (column.length > 0) {
        if (column[0] > column.at(-1)) {
            for (let i = column[1]; i >= column.at(-1); i--) {
                //console.log(i)
                if (!arr[i][row].firstChild) {  // if there's no piece on the square add a class
                    arr[i][row]
                        .classList
                        .add('marked-empty')
                } 
                if(arr[i][row].firstChild){
                    if(arr[i][row].firstChild){
                     if (arr[i][row]?.firstChild.classList[2] !== color) {
                    arr[i][row].classList.add('marked-enemy')
                    // classByColor(
                    //     color,
                    //     arr[i][row]?.firstChild.classList[2],
                    //     i,
                    //     row
                    // )
                  
                }
                else {
                    break
                }
                }
                }
                
               
                
            }
        }
    }

}
const addClassByRow = (column, row, color) => {
    //add avaliable squares to the right by calling a func and adding a class
    for (let i = row[1]; i < row.at(-1); i++) {
        if (!arr[column][i].firstChild) {  // if there's no piece on the square add a class
            arr[column][i]
                .classList
                .add('marked-empty')
        }
        if(arr[i][row].firstChild){
                if (arr[i][row]?.firstChild.classList[2] !== color) {
            arr[i][row].classList.add('marked-enemy')
            // classByColor(
            //     color,
            //     arr[column][i]?.firstChild.classList[2],
            //     column,
            //     i
            // )
           
        }  else{break}  
        }
         
        
        
    }
    //add avaliable squares to the left by calling a func and adding a class
    if (row.length > 0) { 
        if (row[0] > row.at(-1)) { 
            //console.log(row[0] , row.at(-1))
            for (let i = row[1]; i >= row.at(-1); i--) {
                //console.log(i)
                if (!arr[column][i].firstChild) {   // if there's no piece on the square add a class
                    arr[column][i]
                        .classList
                        .add('marked-empty')
                }
                if(arr[i][row].firstChild){
                    if (arr[i][row]?.firstChild.classList[2] !== color) {

                    arr[i][row].classList.add('marked-enemy')
                    // classByColor(
                    //     color,
                    //     arr[column][i]?.firstChild.classList[2],
                    //     column,
                    //     i
                    // )
                   
                } else{break}
                }
                
               
                 
            }
        }
    }
}
const checkMarked = (e, arr) => {
    // console.log('on')
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
// const classByColor = (currentColor, color, i, x) => {
//     //console.log(currentColor, color)
//     if (currentColor === color) {
//         return
//     }

//     arr[i][x]
//         .classList
//         .add('marked-enemy')

// }
const classColorRow = (currentColor, color,row,column) => {
    if(currentColor === color){return}
    console.log(currentColor, color)

}