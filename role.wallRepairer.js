var role_builder = require('role.builder');

module.exports = {
    run: function (creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            var walls = creep.room.find(FIND_STRUCTURES,
                {filter: (s) => s.structureType == STRUCTURE_WALL});
            var target = undefined;
            var min_wall_hits = Game.rooms[creep.room.name].memory.minWallHits;
            var max_wall_hits = Game.rooms[creep.room.name].memory.maxWallHits;

            for (let wall of walls) {
                if (wall.hits < min_wall_hits) {
                    target = wall;
                    break;
                }
            }
            if (target != undefined) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                if(min_wall_hits<max_wall_hits){
                    Game.rooms[creep.room.name].memory.minWallHits =Math.floor(min_wall_hits*1.25);
                }
                else{
                    ;
                }
            }


        } else {
            let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};