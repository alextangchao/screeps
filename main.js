require("prototype.spawn");
require("prototype.creep");
require("prototype.room");
require("prototype.tower");
const init_set = require("init_set");

const home = "E11S2";
console.log("all program init");
Game.notify("all program init");

console.log("commit successful");

module.exports.loop = function () {
    //return;
    clear_memory();
    Game.cpu.generatePixel();
    
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
        /*
        if (name === "Spawn1") {
            Game.spawns.Spawn1.createCreep(
                [WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE,
                 WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE,
                 WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE],
                undefined,
                {role: "long_distance_worker", working: false, target_room: "E12S0", change: "E13S2"});
        }
        */
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
    //console.log("memory clear");
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
}