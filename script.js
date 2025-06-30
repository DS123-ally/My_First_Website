const gridSize = 12;
const words = ["POVERTY", "EDUCATION", "WATER", "ENERGY", "EQUALITY"];
let foundWords = [];

const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [-1, 1]
];

function placeWord(word) {
    for (let attempt = 0; attempt < 100; attempt++) {
        const dir = directions[Math.floor(Math.random() * directions.length)];
        let row = Math.floor(Math.random() * gridSize);
        let col = Math.floor(Math.random() * gridSize);

        let canPlace = true;
        for (let i = 0; i < word.length; i++) {
            let r = row + dir[0] * i;
            let c = col + dir[1] * i;
            if (r < 0 || c < 0 || r >= gridSize || c >= gridSize) {
                canPlace = false;
                break;
            }
            if (grid[r][c] && grid[r][c] !== word[i]) {
                canPlace = false;
                break;
            }
        }

        if (canPlace) {
            for (let i = 0; i < word.length; i++) {
                let r = row + dir[0] * i;
                let c = col + dir[1] * i;
                grid[r][c] = word[i];
            }
            return;
        }
    }
}

words.forEach(placeWord);

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
        if (!grid[r][c]) {
            grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
        }
    }
}

const gridContainer = document.getElementById("grid");

for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = grid[r][c];
        cell.dataset.row = r;
        cell.dataset.col = c;
        gridContainer.appendChild(cell);
    }
}

let selected = "";
let selectedCells = [];

document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", () => {
        selected += cell.textContent;
        cell.classList.add("selected");
        selectedCells.push(cell);

        for (let word of words) {
            if (selected.includes(word) && !foundWords.includes(word)) {
                foundWords.push(word);
                selectedCells.forEach(c => c.classList.remove("selected"));
                selectedCells.forEach(c => c.classList.add("found"));
                selected = "";
                selectedCells = [];
                document.querySelector(`#words li:nth-child(${words.indexOf(word) + 1})`).style.textDecoration = "line-through";
                document.getElementById("message").textContent = `✅ Found: ${word}`;
                if (foundWords.length === words.length) {
                    document.getElementById("message").textContent = "🎉 All words found!";
                }
            }
        }

        if (selected.length > 15) {

            selected = "";
            selectedCells.forEach(c => c.classList.remove("selected"));
            selectedCells = [];
        }
    });
});

function goBack() {
    window.history.back();
}