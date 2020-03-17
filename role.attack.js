module.exports = {
    run: function (creep) {
        if (creep.room.name !== creep.memory.target_room) {
            // find exit to target room
            var exit = creep.room.findExitTo(creep.memory.target_room);
            // move to exit
            creep.moveTo(creep.pos.findClosestByRange(exit));
        } else {
            let target = creep.pos.findClosestByPath(FIND_HOSTILE_SPAWNS);
            if (target == undefined) {
                target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            }
            if (target == undefined) {
                target = creep.pos.findClosestByRange(FIND_HOSTILE_CONSTRUCTION_SITES);
            }
            if (target != undefined) {
                if (creep.attack(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else{
                //creep.moveTo(creep.room.controller);
                
                if (creep.reserveController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    // move towards the controller
                    creep.moveTo(creep.room.controller);
                }
                
                
            }
        }
    }
};