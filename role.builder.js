let role_upgrader = require("role.upgrader");
let role_wall_repairer = require("role.wall_repairer");

module.exports = {
    run: function (creep) {
        creep.update_working_status();
        if (creep.memory.working == true) {
            let constructure = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (constructure != undefined) {
                if (creep.build(constructure) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructure);
                }
            } else {
                role_wall_repairer.run(creep);
            }
        } else {

            let drop_energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 5)[0];
            if (drop_energy != undefined) {
                if (creep.pickup(drop_energy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(drop_energy);
                }
            } else {
                creep.get_energy(true, true);
            }
        }
    }
};