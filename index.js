let numberOfInputs = 0;
let dimensions, wallFirstLayer, rows, cols,
    firstLayer, secondLayer, output;

function main() {
    this.newLine();
    if (numberOfInputs === 0) {
        dimensions = this.lineBuffer.split(" ");
        rows = Number(dimensions[0]);
        cols = Number(dimensions[1]);
        if (areDimensionsCorrect(rows, cols)) {
            numberOfInputs++;
        } else {
            this.type('N and M should be even numbers in the range between 0 and 100.');
        }
    } else if (numberOfInputs === 1) {
        wallFirstLayer = this.lineBuffer;
        console.log(wallFirstLayer)
        firstLayer = createFirstLayer(wallFirstLayer);
        if (areBricksCorrect(firstLayer)) {
            numberOfInputs++;

            createTemplateForSecondLayer();

            fillSecondLayer();

            surroundBricksWithAsterisks();

            let wall = printWall();
            console.log(wall);
            multiLineType(wall, this);

            this.type("Press enter to continue...");
        }
        else this.type('The bricks must span exactly 2 rows/columns.');
    } else if (numberOfInputs > 1) {
        this.close();
        numberOfInputs = 0;
    }

    this.prompt();
}


function areDimensionsCorrect(rows, cols) {
    // Validating that N and M should define a valid area of less than 100 lines/columns.
    if (rows > 100 || cols > 100 || rows % 2 === 1 || cols % 2 === 1 || rows <= 0 || cols <= 0) {
        return false;
    } else return true;
}

function createFirstLayer(wallFirstLayer) {
    // Creating the matrix for the first layer.
    let wallNumbers = wallFirstLayer.split(" ");
    let index = 0;

    firstLayer = [];
    console.log(rows)
    console.log(cols)
    for (let i = 0; i < rows; i++) {
        firstLayer[i] = [];
        for (let j = 0; j < cols; j++) {
            firstLayer[i].push(Number(wallNumbers[index++]));
        }
    }
    return firstLayer;
}

function areBricksCorrect(firstLayer) {
    // Validating that there are no bricks spanning 3 rows/columns.
    let isValid = true;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let currentDigit = firstLayer[i][j];
            let counter = 1;
            for (let k = j + 1; k < cols; k++) {
                if (currentDigit === firstLayer[i][k]) {
                    counter++;
                }
            }
            if (counter === 3) {
                isValid = false;
                break;
            }
            counter = 1;
            for (let k = i + 1; k < rows; k++) {
                if (currentDigit === firstLayer[k][j]) {
                    counter++;
                }
            }
            if (counter === 3) {
                isValid = false;
                break;
            }
        }
        if (!isValid) {
            break;
        }
    }

    if (!isValid) {
        return false;
    } else return true
}

// Creating the template for the second layer.
function createTemplateForSecondLayer() {
    secondLayer = [];
    for (let i = 0; i < rows; i++) {
        secondLayer[i] = [];
        for (let j = 0; j < cols; j++) {
            secondLayer[i][j] = 0;
        }
    }
}

// Filling the second layer with the bricks.
function fillSecondLayer() {
    if (rows <= 2 && cols <= 4) {
        for (let i = 0; i < cols - 1; i += 2) {
            if (firstLayer[0][i] === firstLayer[0][i + 1] && firstLayer[1][i] === firstLayer[1][i + 1]) {
                secondLayer[0][i] = firstLayer[0][i];
                secondLayer[1][i] = firstLayer[0][i + 1];
                secondLayer[0][i + 1] = firstLayer[1][i];
                secondLayer[1][i + 1] = firstLayer[1][i + 1];
            } else if (firstLayer[0][i] === firstLayer[1][i] && firstLayer[0][i + 1] === firstLayer[1][i + 1]) {
                secondLayer[0][i] = firstLayer[0][i];
                secondLayer[0][i + 1] = firstLayer[1][i];
                secondLayer[1][i] = firstLayer[0][i + 1];
                secondLayer[1][i + 1] = firstLayer[1][i + 1];
            } else if (firstLayer[0][i + 1] === firstLayer[0][i + 2] && firstLayer[1][i + 1] === firstLayer[1][i + 2]) {
                secondLayer[0][i] = firstLayer[0][i];
                secondLayer[0][i + 1] = firstLayer[1][i];
                secondLayer[1][i] = firstLayer[0][i + 1];
                secondLayer[1][i + 1] = firstLayer[0][i + 2];
                secondLayer[0][i + 2] = firstLayer[1][i + 1];
                secondLayer[0][i + 3] = firstLayer[1][i + 2];
                secondLayer[1][i + 2] = firstLayer[0][i + 3];
                secondLayer[1][i + 3] = firstLayer[1][i + 3];
                break;
            }
        }
    } else {
        for (let i = 0; i < rows - 1; i += 2) {
            for (let j = 0; j < cols; j++) {
                if (firstLayer[i][j] === firstLayer[i + 1][j] && firstLayer[i][j + 1] === firstLayer[i][j + 2]
                    && firstLayer[i + 1][j + 1] === firstLayer[i + 1][j + 2]) {
                    secondLayer[i][j] = firstLayer[i][j + 1];
                    secondLayer[i][j + 1] = firstLayer[i][j + 2];
                    secondLayer[i][j + 2] = firstLayer[i][j];
                    secondLayer[i + 1][j] = firstLayer[i + 1][j + 1];
                    secondLayer[i + 1][j + 1] = firstLayer[i + 1][j + 2];
                    secondLayer[i + 1][j + 2] = firstLayer[i + 1][j];
                    j += 2;
                } else if (firstLayer[i][j] === firstLayer[i][j + 1] && firstLayer[i + 1][j] === firstLayer[i + 1][j + 1]
                    && firstLayer[i][j + 2] === firstLayer[i + 1][j + 2]) {
                    secondLayer[i][j] = firstLayer[i][j + 2];
                    secondLayer[i][j + 1] = firstLayer[i][j];
                    secondLayer[i][j + 2] = firstLayer[i][j + 1];
                    secondLayer[i + 1][j] = firstLayer[i + 1][j + 2];
                    secondLayer[i + 1][j + 1] = firstLayer[i + 1][j];
                    secondLayer[i + 1][j + 2] = firstLayer[i + 1][j + 1];
                    j += 2;
                } else if (firstLayer[i][j] === firstLayer[i][j + 1] && firstLayer[i + 1][j] === firstLayer[i + 1][j + 1]) {
                    secondLayer[i][j] = firstLayer[i][j];
                    secondLayer[i][j + 1] = firstLayer[i + 1][j];
                    secondLayer[i + 1][j] = firstLayer[i][j + 1];
                    secondLayer[i + 1][j + 1] = firstLayer[i + 1][j + 1];
                    j += 1;
                } else if (firstLayer[i][j] === firstLayer[i + 1][j] && firstLayer[i][j + 1] === firstLayer[i + 1][j + 1]) {
                    secondLayer[i][j] = firstLayer[i][j];
                    secondLayer[i][j + 1] = firstLayer[i + 1][j];
                    secondLayer[i + 1][j] = firstLayer[i][j + 1];
                    secondLayer[i + 1][j + 1] = firstLayer[i + 1][j + 1];
                    j += 1;
                }
            }
        }
    }
}

// Surrounding each brick with asterisks.
function surroundBricksWithAsterisks() {
    output = []
    for (let i = 0; i < rows * 2 + 1; i++) {
        output[i] = [];
        for (let j = 0; j < cols * 2 + 1; j++) {
            output[i][j] = "* ";
        }
    }

    let counterRows = 0;
    for (let i = 1; i < output.length - 1; i += 2) {
        let counterCols = 0;
        for (let j = 1; j < output[i].length - 1; j += 2) {
            if (secondLayer[counterRows][counterCols] < 10) {
                output[i][j] = " " + secondLayer[counterRows][counterCols];
            } else {
                output[i][j] = secondLayer[counterRows][counterCols];
            }
            counterCols++
        }
        counterRows++
    }

    for (let i = 1; i < output.length - 1; i += 2) {
        for (let j = 1; j < output[i].length - 3; j += 2) {
            if (i < output.length - 3) {
                if (output[i][j] === output[i][j + 2]) {
                    output[i][j + 1] = "  ";
                } else if (output[i][j] === output[i + 2][j]) {
                    output[i + 1][j] = "  ";
                }
            } else {
                if (output[i][j] === output[i][j + 2]) {
                    output[i][j + 1] = "  ";
                }
            }
        }
    }
}

// Printing the output.
function printWall() {
    let wall = "";
    for (let i = 0; i < output.length; i++) {
        let printline = "";
        for (let j = 0; j < output[i].length; j++) {
            printline += output[i][j];
        }
        wall += `${printline}/n`;
    }
    return wall;
}