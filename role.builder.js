var role_upgrader = require("role.upgrader")

module.exports = {
    run: function (creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            let constructure = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (constructure != undefined) {
                if (creep.build(constructure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructure);
                }
            } else {
                role_upgrader.run(creep);
            }
        } else {
            let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};