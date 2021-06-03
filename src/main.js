require("prototype.spawn");
require("prototype.creep");
require("prototype.room");
require("prototype.tower");
require("room.operation");

global.pq = require("pq");
let resume_task = require("task.resume");

let goto = require("task.goto");

const stat = require("stat");
const init_set = require("init_set");

const home = "E11S2";
console.log("all program init");

resume_task();

// test pq
// global.qq = new pq();
// qq.push({name:"empty"});
// qq.push({time: 250});
// qq.push({time: 555});
// qq.push({time:5});
// qq.push({time:350});
// qq.push({time:50});
// console.log(JSON.stringify(qq))
// console.log(JSON.stringify(qq.pop()))
// console.log(JSON.stringify(qq))
// console.log(JSON.stringify(qq.pop()))
// console.log(JSON.stringify(qq))

// end test pq

//temp---------
global.poss = Game.rooms.sim.controller.pos;
global.add_task_goto = function (pos) {
    global.task.rooms.sim.push({
        name: "goto",
        room: "sim",
        func: goto.run,
        argument: [pos]
    })
};
//-------------


module.exports.loop = function () {
    //return;
    clear_memory();

    for (let name in Game.rooms) {
        let room = Game.rooms[name];
        if (room.memory.need_init !== false) {
            init_set.run(room);
        }
        room.cal_energy_available();
        room.operate();
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


    //save tasks into memory
    for (let room_name in Game.rooms) {
        Game.rooms[room_name].memory.task = global.task.rooms[room_name];
    }
    for (let creep_name in Game.creeps) {
        Game.creeps[creep_name].memory.task = global.task.creeps[creep_name];
    }

    //stat.cal_stat();
};

function clear_memory() {
    //console.log("memory clear");
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
}