require("prototype.spawn");
require("prototype.creep");
require("prototype.room");
require("prototype.tower");
var init_set = require("init_set");

var home = "E11S2";

module.exports.loop = function () {
    clear_memory();

    for (let name in Game.rooms) {
        let room = Game.rooms[name];
        if (room.memory.need_init !== false) {
            init_set.run(room);
        }
        room.cal_energy_available();
    }

    // for each creeps
    for (let name in Game.creeps) {
        // run creep logic
        Game.creeps[name].run();
    }

    // for each spawn
    for (let name in Game.spawns) {
        // run spawn logic
        Game.spawns[name].run();
        if(name=="Spawn1"){
            Game.spawns[name].createCreep([MOVE,ATTACK,MOVE,CLAIM,MOVE,CLAIM,MOVE,CLAIM],undefined,
                {role:"attack",target_room:"E8S2"});
        }
    }

    // find all towers
    let towers = _.filter(Game.structures, s => s.structureType === STRUCTURE_TOWER);
    // for each tower
    for (let tower of towers) {
        // run tower logic
        tower.run();
    }
};

function clear_memory() {
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
}