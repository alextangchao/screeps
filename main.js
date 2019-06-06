require("prototype.spawn");
require("prototype.creep");
require("prototype.room");
require("prototype.tower");
var init_set = require("init_set");

var home = "E11S2";

for (let name in Game.rooms) {
    init_set.run(Game.rooms[name]);
}

module.exports.loop = function () {
    clear_memory();

    for (let name in Game.rooms) {
        // run creep logic
        Game.rooms[name].cal_energy_available();
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
    }

    // find all towers
    var towers = _.filter(Game.structures, s => s.structureType === STRUCTURE_TOWER);
    // for each tower
    for (let tower of towers) {
        // run tower logic
        tower.run();
    }
};

function clear_memory() {
    for (let name in Memory.creeps) {
        if (Game.creeps[name] === undefined) {
            delete Memory.creeps[name];
        }
    }
}