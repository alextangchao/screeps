var role_builder = require('role.builder');

module.exports = {
    run: function (creep) {
        if (creep.memory.working === true) {
            let walls = creep.room.find(FIND_STRUCTURES,
                {filter: (s) => s.structureType === STRUCTURE_WALL});
            let target = undefined;
            let min_wall_hits = creep.room.memory.wall_hits.min;
            let max_wall_hits = creep.room.memory.wall_hits.max;

            for (let wall of walls) {
                if (wall.hits < min_wall_hits) {
                    target = wall;
                    break;
                }
            }
            if (target !== undefined) {
                if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                if (min_wall_hits < max_wall_hits) {
                    creep.room.memory.wall_hits.min += 2000;
                } else {
                    role_builder.run(creep);
                }
            }


        } else {
            creep.get_energy();
        }
    }
};