// let role_builder = require('role.builder');

module.exports = {
    run: function (creep) {
        creep.update_working_status();
        if (creep.memory.working === true) {
            let construction = creep.room.find(FIND_CONSTRUCTION_SITES,
                {filter: (s) => s.structureType === STRUCTURE_WALL || s.structureType === STRUCTURE_RAMPART});
            if (construction.length > 0) {
                let target = creep.pos.findClosestByPath(construction);
                if (creep.build(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
                return;
            }
            let walls = creep.room.find(FIND_STRUCTURES,
                {filter: (s) => s.structureType === STRUCTURE_WALL || s.structureType === STRUCTURE_RAMPART});
            let min_wall_hits = creep.room.memory.wall_hits.min;
            let max_wall_hits = creep.room.memory.wall_hits.max;

            let target = creep.pos.findClosestByPath(walls,{
                filter: s=>s.hits<min_wall_hits
            });

            if (target != undefined) {
                if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                if (min_wall_hits < max_wall_hits) {
                    creep.room.memory.wall_hits.min = Math.min(min_wall_hits + 2000, max_wall_hits);
                } else {
                    //role_builder.run(creep);
                }
            }
        } else {
            creep.get_energy(false, false);
        }
    }
};