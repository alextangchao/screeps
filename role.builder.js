var role_upgrader = require("role.upgrader");

module.exports = {
    run: function (creep) {
        creep.update_working_status();
        if (creep.memory.working === true) {
            let constructure = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (constructure != undefined) {
                if (creep.build(constructure) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructure);
                }
            } else {
                role_upgrader.run(creep);
            }
        } else {
            creep.get_energy(true, false);
        }
    }
};