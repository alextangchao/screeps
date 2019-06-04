require("prototype.spawn");
require("prototype.creep");
require("prototype.room");
require("prototype.tower");
var init_set = require("init_set");

var home = "E11S2";

module.exports.loop = function () {
    for (let name in Game.rooms) {
        // run creep logic
        Game.rooms[name].cal_energy_available();
        init_set.run(Game.rooms[name]);
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
};

function clear_memory() {
    for (let name in Memory.creeps) {
        if (Game.creeps[name] === undefined) {
            delete Memory.creeps[name];
        }
    }
}