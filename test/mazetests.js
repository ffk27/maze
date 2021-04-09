const expect = require("chai").expect;
const Maze = require("../Maze").Maze;
const DisjointSets = require("../DisjointSets").DisjointSets;

describe("Maze tests", function() {
    it("should give correct list of edges", function(done) {
        const maze = new Maze(3, 3);
        const edges = maze.listEdges();
        expect(edges.length).to.equal(12);
        expect(findEdge(edges, [1,2])).to.not.equal(undefined);
        expect(findEdge(edges, [2,3])).to.not.equal(undefined);
        expect(findEdge(edges, [1,4])).to.not.equal(undefined);
        expect(findEdge(edges, [2,5])).to.not.equal(undefined);
        expect(findEdge(edges, [3,6])).to.not.equal(undefined);
        expect(findEdge(edges, [4,5])).to.not.equal(undefined);
        expect(findEdge(edges, [5,6])).to.not.equal(undefined);
        expect(findEdge(edges, [4,7])).to.not.equal(undefined);
        expect(findEdge(edges, [5,8])).to.not.equal(undefined);
        expect(findEdge(edges, [6,9])).to.not.equal(undefined);
        expect(findEdge(edges, [7,8])).to.not.equal(undefined);
        expect(findEdge(edges, [8,9])).to.not.equal(undefined);
        done();
    });

    it("should find the right set", function (done) {
        const disjointSets = new DisjointSets(9);
        const set = disjointSets.find(1);
        expect(set).to.equal(1);

        disjointSets.union(1, 2);

        expect(disjointSets.find(2)).to.equal(1);

        disjointSets.union(2, 3);

        expect(disjointSets.find(3)).to.equal(1);

        done();
    });

    it("should merge the smallest set to bigger set", function(done) {
        const disjointSets = new DisjointSets(9);
        disjointSets.union(1, 2);
        disjointSets.union(1, 3);

        disjointSets.union(4, 5);
        disjointSets.union(4, 1);

        expect(disjointSets.find(4)).to.equal(1);
        console.log(disjointSets.setArray);
        done();
    });

    it("should use find path compression", function(done) {
        const disjointSets = new DisjointSets(9);
        disjointSets.union(1, 2);
        disjointSets.union(2, 3);
        disjointSets.union(3, 4);
        disjointSets.union(4, 5);
        expect(disjointSets.find(5)).to.equal(1);

        done();
    });
});

function findEdge(edges, edge) {
    return edges.find(e => { return e[0] === edge[0] && e[1] === edge[1]; });
}