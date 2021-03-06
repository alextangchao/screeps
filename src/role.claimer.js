module.exports = {
    /**
     * @target_room
     */
    run: function (creep) {
        // if in target room
        if (creep.room.name !== creep.memory.target_room) {
            // find exit to target room
            let exit = creep.room.findExitTo(creep.memory.target_room);
            // move to exit
            creep.moveTo(creep.pos.findClosestByRange(exit));
        } else {
            // try to claim controller
            if (creep.claimController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                // move towards the controller
                creep.moveTo(creep.room.controller);
            }
        }
    }
};