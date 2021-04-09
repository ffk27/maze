try {
    if (DisjointSets) {}
} catch(e) {
    // for NodeJS
    exports.DisjointSets = require("./DisjointSets").DisjointSets;
}

class Maze {
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.size = this.rows * this.cols;
        this.disjointSets = new exports.DisjointSets(this.size);
    }

    listEdges() {
        const edges = [];
        for (let i = 0; i < this.size; i++) {
            const pos = i + 1;
            if (pos % this.cols !== 0)  {
                edges.push([pos, pos + 1]);
            }
            if (pos + this.cols <= this.size) {
                edges.push([pos, pos + this.cols]);
            }
        }
        return edges;
    }

    createRandomMaze() {
        const maze = [];
        const e = this.listEdges();
        while (e.length > 0) {
            //pick random element from e and remove
            const edge = e.splice(Math.floor(Math.random() * e.length), 1)[0];
            const u = this.disjointSets.find(edge[0]);
            const v = this.disjointSets.find(edge[1]);

            if (!this.disjointSets.union(u, v)) {
                maze.push(edge);
            }
        }
        this.maze = maze;
    }

    hasWall(pos1, pos2) {
        
        for (let edge of this.maze) {
            
            if (pos2 < 1) return 0;

            if (e[0]===pos1 && e[1]===pos2) {
                return true;
            }
        }
        return false;
    }
}

exports.Maze = Maze;