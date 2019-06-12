module.exports = {
    run: function (creep) {
        creep.update_working_status();
        if (creep.memory.working === true) {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            creep.get_energy(true, false);
        }
    }
};