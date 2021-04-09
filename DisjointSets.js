class DisjointSets {
    constructor(size) {
        this.setArray = [];
        for (let i=0; i<size; i++) {
            this.setArray.push(-1);
        }
    }

    union(pos1, pos2) {
        const u = this.find(pos1);
        const v = this.find(pos2);
        if (u !== v) {
            // merge smallest set to bigger one
            if (this.setArray[u - 1] <= this.setArray[v - 1]) {
                this.setArray[pos2 - 1] = pos1;
                this.setArray[u - 1]--;
            } else {
                this.setArray[pos1 - 1] = pos2;
                this.setArray[v - 1]--;
            }
            return true;
        }
        return false;
    }

    find(pos) {
        const parent = this.setArray[pos - 1];
        if (parent < 0) { // if parent is a root
            return pos;
        }
        return this.setArray[pos - 1] = this.find(parent);
    }
}

exports.DisjointSets = DisjointSets;