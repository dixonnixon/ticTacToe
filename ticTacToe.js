//CheckWin

/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
function chunkArrayIntoRows(myArray, chunk_size) {
    var results = [];
    
    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }
    
    return results;
}

/**
 * Returns an array with arrays of columns.
 *
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
 function chunkArrayIntoColumns(myArray, chunk_size) {
    var results = [];
    // console.log(myArray, chunk_size ** 2);
    for(let k = 0; k < chunk_size; k += 1) {
        for(let i = k; i < chunk_size ** 2 ; i += chunk_size) {
            // console.log(myArray[i], i);
            results.push(myArray[i]);
        }
    }

    return chunkArrayIntoRows(results, 3);
}

function Game(playersNamesList) {
    this.playersNamesList = playersNamesList;
    function* generateSequence(start, end) {
        for (let i = start; i <= end; i++) 
            yield Math.round(Math.random());
      }
    function* generateOXO() {
        yield* generateSequence(0, 9);
    }
    
    this.getResult = function() {
        let result = [] 
        for(let value of generateOXO()) {
            result.push(this.playersNamesList[value]);
        }
        return result;
    }

    this.getPlayers = () => this.playersNamesList;
}



function ticTacToe(finished) {

    this.winner = null;

    const size = finished.length;
    const degree = Math.sqrt(size);
    let rows = chunkArrayIntoRows(Array.from(finished), degree)
    let cols = chunkArrayIntoColumns(Array.from(finished), degree)



    let diags = [[], []];
    for(let i = 0, k = i + degree - 1; i < degree; i += 1, k -= 1) {
        diags[0].push(rows[i][k]);
        diags[1].push(rows[i][i]);
    }

    this.isRowFilledWithPlayer = function(aRow, player) {
        return aRow.every((aPlayerLabel) => aPlayerLabel === player.label);
    }

    this.checkWinner = function(tuples, player) {
        return tuples.map(function(el) {  
            return this(el,  player); 
        }, this.isRowFilledWithPlayer).every((el) => el == false)
    }
    
    this.errors = {
        input: "Wrong Input or there are Invaders!"
    };
    
    this.getWinner = function() {
        
        if(!this.checkWinner(diags.concat( rows, cols), { label: "X" })) {
            this.winner = "X";
        }
    
        if(!this.checkWinner(diags.concat( rows, cols), { label: "O" })) {
            this.winner = "O";
        }

        if(this.winner === null) {
            this.winner = 'draw';
        }
        return this.winner;
    }
    

}

let game = new Game(["X", "O"]); 
let res = new ticTacToe(game.getResult());

console.log(res.getWinner());
  
