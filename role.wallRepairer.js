var role_builder = require('role.builder');

module.exports = {
    run: function (creep) {
        creep.update_working_status();
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
                    creep.room.memory.wall_hits.min = Math.min(min_wall_hits + 2000, max_wall_hits);
                } else {
                    role_builder.run(creep);
                }
            }


        } else {
            creep.get_energy();
        }
    }
};