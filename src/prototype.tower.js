StructureTower.prototype.run = function () {
    // find closes hostile creep
    let hostile_creep = this.room.find(FIND_HOSTILE_CREEPS);
    // if one is found...
    if (hostile_creep.length > 0) {
        // ...FIRE!
        // attack the enemy with HEAL part first
        let target = this.pos.findClosestByRange(hostile_creep, {
            filter: s => s.getActiveBodyparts(HEAL) > 0
        });
        // then attack the enemy with ATTACK part
        if (target == undefined) {
            target = this.pos.findClosestByRange(hostile_creep, {
                filter: s => s.getActiveBodyparts(ATTACK) > 0
            });
        }
        if (target == undefined) {
            target = this.pos.findClosestByRange(hostile_creep);
        }
        this.attack(target);
    }

    // repaire the rampart
    else {
        let road = this.pos.findClosestByRange(FIND_STRUCTURES,
            {filter: (s) => s.structureType === STRUCTURE_ROAD && s.hits < s.hitsMax});
        if (road != undefined) {
            this.repair(road)
        }
    }

};