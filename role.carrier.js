let role_upgrader = require("role.upgrader");
let role_builder = require("role.builder");

module.exports = {
    run: function (creep) {
        creep.update_working_status();
        if (creep.memory.working === true) {
            let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
                {
                    filter: (s) => (s.structureType === STRUCTURE_TOWER
                        && s.store.getFreeCapacity(RESOURCE_ENERGY) > 500)
                });
            if (structure == undefined) {
                structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
                    {
                        filter: (s) => ((s.structureType === STRUCTURE_SPAWN
                            || s.structureType === STRUCTURE_EXTENSION
                            || s.structureType === STRUCTURE_TOWER)
                            && s.energy < s.energyCapacity)
                    });
            }
            if (structure == undefined) {
                structure = creep.room.storage;
                creep.memory.energy_to_storage = true;
            } else {
                creep.memory.energy_to_storage = false;
            }

            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            } else {
                // role_builder.run(creep);
            }
        } else {
            if (creep.memory.energy_to_storage === true) {
                creep.get_energy(false, true, false);
            } else {
                creep.get_energy(false);
            }

        }
    }
};