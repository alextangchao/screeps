var role_builder = require('role.builder');

module.exports = {
    run: function (creep) {
        creep.update_working_status();
        if (creep.memory.working == true) {
            let structure = creep.pos.findClosestByPath(FIND_STRUCTURES,
                {
                    filter: (s) => (s.hits < s.hitsMax
                        && s.structureType !== STRUCTURE_WALL
                        && s.structureType !== STRUCTURE_RAMPART)
                        || (s.structureType === STRUCTURE_TOWER
                            && s.energy < s.energyCapacity)
                });
            if (structure != undefined) {
                if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            } else {
                role_builder.run(creep);
            }
        } else {
            creep.get_energy(false, false);
        }
    }
};