require("prototype.spawn")();
require("prototype.creep");
var init_set=require("init_set");
var role_harvester = require("role.harvester");
var role_upgrader = require("role.upgrader");
var role_builder = require("role.builder");
var role_repairer = require("role.repairer");
var role_wall_repairer = require("role.wallRepairer");

var home = "sim";//"E11S2";

module.exports.loop = function () {
    init_set.run(Game.rooms["sim"]);
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        Game.creeps[name].run();
    }

    var towers = Game.rooms[home].find(FIND_STRUCTURES,
        {filter: (s) => s.structureType == STRUCTURE_TOWER});
    for (let tower of towers) {
        let hostile_target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (hostile_target != undefined) {
            tower.attack(hostile_target);
        }
    }


    var min_harvester = 1;
    var min_upgrader = 1;
    var min_builder = 1;
    var min_repairer = 1;
    var min_wall_repairer = 1;

    var num_harvester = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
    var num_upgrader = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
    var num_builder = _.sum(Game.creeps, (c) => c.memory.role == "builder");
    var num_repairer = _.sum(Game.creeps, (c) => c.memory.role == "repairer");
    var num_wall_repairer = _.sum(Game.creeps, (c) => c.memory.role == "wall_repairer");

    var max_energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
    //max_energy=1200;
    var name = undefined;

    if (num_harvester < min_harvester) {
        name = Game.spawns.Spawn1.createBigCreep(max_energy, "harvester");
        if (name == ERR_NOT_ENOUGH_ENERGY && num_harvester == 0) {
            name = Game.spawns.Spawn1.createBigCreep(
                Game.spawns.Spawn1.room.energyAvailable, "harvester");
        }
    } else if (num_upgrader < min_upgrader) {
        name = Game.spawns.Spawn1.createBigCreep(max_energy, "upgrader");
    } else if (num_repairer < min_repairer) {
        name = Game.spawns.Spawn1.createBigCreep(max_energy, "repairer");
    } else if (num_builder < min_builder) {
        name = Game.spawns.Spawn1.createBigCreep(max_energy, "builder");
    } else if (num_wall_repairer < min_wall_repairer) {
        name = Game.spawns.Spawn1.createBigCreep(max_energy, "wall_repairer");
    } else {
        name = -1;
    }

    if (!(name < 0)) {
        console.log("Spawned new creep: " + name);
        console.log("harvester: " + num_harvester);
        console.log("upgrader: " + num_upgrader);
        console.log("builder: " + num_builder);
        console.log("repairer: " + num_repairer);
        console.log("wall repairer: " + num_wall_repairer+"\n\n");
    }
};