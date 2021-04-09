const ROWSDEFAULT = 30;
const COLSDEFAULT = 30;
let CELLWIDTH, CELLHEIGHT;
const exports = {};

window.onload = function() {
    const rowsfield = document.getElementById("rows");
    rowsfield.value = ROWSDEFAULT;
    const colsfield = document.getElementById("cols");
    colsfield.value = COLSDEFAULT;
    const errordiv = document.getElementById("errormsg");

    const canvassection = document.getElementById("canvassection");
    let ctx;

    document.getElementById("generate").addEventListener("click", btnGenerateClicked);

    function btnGenerateClicked(event) {
        const rows = parseInt(rowsfield.value);
        const cols = parseInt(colsfield.value);

        if (!rows || !cols) {
            return displayError("Fout: missende of foutieve waarden");
        }

        const maze = new Maze(cols, rows);
        exports.maze = maze;

        const canvas = document.createElement("canvas");
        canvas.style.margin = "auto";
        canvas.style.maxWidth = "640px";
        canvas.style.width = "100%";

        canvas.width = 640;
        canvas.height = 640;
        canvas.addEventListener("click", () => {
            solveMaze(maze);
        });
        ctx = canvas.getContext("2d");

        if (canvassection.firstChild) {
            canvassection.replaceChild(canvas, canvassection.firstChild);
        } else {
            canvassection.appendChild(canvas);
        }

        CELLHEIGHT = canvas.height / maze.rows;
        CELLWIDTH = canvas.width / maze.cols;
        maze.createRandomMaze(maze.listEdges());
        drawOnCanvas(maze);
    }

    function solveMaze(maze) {
        let pos = 1;  
        const solution = [];
        
        while (pos !== maze.size) {
            if (pos) {

            }
        }
        // const interval = setInterval(() => {
        //     console.log( maze.size);

        //     clearInterval(interval);
        // }, 500);
    }

    function drawOnCanvas(maze) {
        for (let i = 0; i < maze.maze.length; i++) {
            const edge = maze.maze[i];
            const pos0 = edge[0];
            const pos1 = edge[1];
            if (pos1 === pos0 + 1) {
                // vertical wall
                const x = CELLWIDTH * (pos0 % maze.cols);
                const y1 = CELLHEIGHT * Math.floor(pos0 / maze.cols);
                const y2 = y1 + CELLHEIGHT;
                drawStroke(ctx, x, y1, x, y2);
            } else {
                // horizontal wall
                const y = CELLHEIGHT * Math.floor((pos1 -1) / maze.cols);
                const x1 = CELLWIDTH * ((pos1 - 1) % maze.cols);
                const x2 = x1 + CELLWIDTH;
                drawStroke(ctx, x1, y, x2, y);
            }
        }

        //Draw border
        drawStroke(ctx, 0, 0, 640, 0);
        drawStroke(ctx, 0, 640, 640, 640);
        drawStroke(ctx, 0, CELLHEIGHT, 0, 640);
        drawStroke(ctx, 640, 0, 640, 640 - CELLHEIGHT);

        document.getElementById("solvebtn").style.display = "inline";
    }

    function drawStroke(ctx, x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function clearCanvas(ctx) {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
    }

    function displayError(error) {
        errordiv.css("display", "block");
        return errordiv.html(error);
    }
};