let role_upgrader = require("role.upgrader");
let role_wall_repairer = require("role.wall_repairer");

module.exports = {
    /**
     * @target_room
     */
    run: function (creep) {
        creep.update_working_status();
        if (creep.memory.working === true) {
            if (creep.room.name !== creep.memory.target_room) {
                // find exit to target room
                let exit = creep.room.findExitTo(creep.memory.target_room);
                // move to exit
                creep.moveTo(creep.pos.findClosestByRange(exit));
            } else {
                if (creep.room.name == "E12S0") {
                    creep.memory.target_room = "E13S0";
                    let exit = creep.room.findExitTo(creep.memory.target_room);
                    // move to exit
                    creep.moveTo(creep.pos.findClosestByRange(exit));
                    return;
                }
                if (creep.room.name == "E13S0") {
                    creep.memory.target_room = "E14S1";
                    let exit = creep.room.findExitTo(creep.memory.target_room);
                    // move to exit
                    creep.moveTo(creep.pos.findClosestByRange(exit));
                    return;
                }
                if (creep.room.name == "E14S1" && creep.memory.change != undefined) {
                    creep.memory.target_room = creep.memory.change;
                    let exit = creep.room.findExitTo(creep.memory.target_room);
                    // move to exit
                    creep.moveTo(creep.pos.findClosestByRange(exit));
                    return;
                }
                if(creep.ticksToLive == 120){
                    console.log("will dead");
                    creep.memory.role = "upgrader";
                }
                /*
                if (creep.memory.alive != undefined || creep.ticksToLive == 150) {
                    let num = Game.spawns.Spawn1.createCreep(
                        [WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE,
                            WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE],
                        undefined,
                        {role: "long_distance_worker", working: false, target_room: "E12S0", change: creep.room});
                    if (num === 0) {
                        creep.memory.alive = true;
                    }
                }
                */
                if (creep.room.controller.my && creep.room.controller.level === 8 && creep.room.controller.ticksToDowngrade < 199000) {
                    role_upgrader.run(creep);
                    return;
                }
                let constructure = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if (constructure != undefined) {
                    if (creep.build(constructure) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructure);
                    }
                } else {
                    role_upgrader.run(creep);
                }
            }
        } else {
            // if in target room
            let drop_energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 5)[0];
            if (drop_energy != undefined) {
                if (creep.pickup(drop_energy) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(drop_energy);
                }
            } else {
                creep.get_energy(true, true);
            }
        }
    }
}
;