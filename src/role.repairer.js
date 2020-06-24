let role_builder = require('role.builder');
let role_upgrader = require("role.upgrader");

module.exports = {
    run: function (creep) {
        creep.update_working_status();
        if (creep.memory.working == true) {
            let structure = creep.pos.findClosestByPath(FIND_STRUCTURES,
                {
                    filter: (s) => (s.hits < s.hitsMax
                        && s.structureType !== STRUCTURE_ROAD
                        && s.structureType !== STRUCTURE_WALL
                        && s.structureType !== STRUCTURE_RAMPART)
                });
            if (structure == undefined) {
                structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
                    {
                        filter: (s) => (s.structureType === STRUCTURE_TOWER
                            && s.energy < s.energyCapacity)
                    });
                if (structure != undefined) {
                    if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                    return;
                }
            }
            if (structure != undefined) {
                if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            } else {
                role_upgrader.run(creep);
            }
        } else {
            creep.get_energy(true, true);
        }
    }
};