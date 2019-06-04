
module.exports = {
    run: function (creep) {
        if (creep.memory.working === true) {
            let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
                {
                    filter: (s) => (s.structureType === STRUCTURE_SPAWN
                        || s.structureType === STRUCTURE_EXTENSION
                        || s.structureType === STRUCTURE_TOWER)
                        && s.energy < s.energyCapacity
                });
            if (structure !== undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            } else {
                role_builder.run(creep);
            }
        } else {
            creep.get_energy();
        }
    }
};