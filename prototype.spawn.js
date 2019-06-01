module.exports = function () {
    // create a new function to spawn big creep
    StructureSpawn.prototype.createBigCreep =
        function (energy, roleName) {
            let n = Math.floor(energy / 200);
            let body = [];
            for (let i = 0; i < n; i++) {
                body.push(WORK, CARRY, MOVE);
            }
            return this.createCreep(body, undefined,
                {role: roleName, working: false});
        };
};