StructureTower.prototype.run = function () {
    // find closes hostile creep
    var hostile_creep = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    // if one is found...
    if (hostile_creep != undefined) {
        // ...FIRE!
        this.attack(hostile_creep);
    }
};