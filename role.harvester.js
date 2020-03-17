var role_upgrader = require("role.upgrader");
var role_builder = require("role.builder");

module.exports = {
    run: function (creep) {
        creep.update_working_status();
        if (creep.memory.working === true) {
            let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
                {
                    filter: (s) => ((s.structureType === STRUCTURE_SPAWN
                        //|| s.structureType === STRUCTURE_TOWER
                        || s.structureType === STRUCTURE_EXTENSION)
                        && s.energy < s.energyCapacity)

                });
            if (structure == undefined) {
                structure = creep.pos.findClosestByPath(FIND_STRUCTURES,
                    {filter: (s) => s.structureType === STRUCTURE_ROAD && s.hits < s.hitsMax});
                // console.log(structure.pos)
                if (structure != undefined) {
                    if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                    return;
                }
            }
            if (structure == undefined) {
                structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
                    {filter: s => s.structureType === STRUCTURE_STORAGE});
            }

            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            } else {
                role_builder.run(creep);
            }
        } else {
            let drop_energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 5)[0];
            if (drop_energy != undefined) {
                if (creep.pickup(drop_energy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(drop_energy);
                }
            } else {
                creep.get_energy();
            }
        }
    }
};