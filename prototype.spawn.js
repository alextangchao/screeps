var roles = ["harvester", "miner", "linker", "carrier", "upgrader", "repairer", "builder", "wall_repairer"];

StructureSpawn.prototype.run = function () {
    let creeps = this.room.find(FIND_MY_CREEPS);
    let num_creeps = {};
    for (let role of roles) {
        num_creeps[role] = _.sum(creeps, c => c.memory.role === role);
    }
    let max_energy = Math.min(120055555, this.room.energyCapacityAvailable);
    let name = undefined;

    //backup solution or use harvester
    if (num_creeps.harvester < this.room.memory.min_creeps.harvester && num_creeps.carrier === 0) {
        if (num_creeps.miner > 0 || num_creeps.linker > 0
            || (this.room.storage != undefined && this.room.storage.store[RESOURCE_ENERGY] >= 550)) {
            name = this.create_carrier(Math.min(450, this.room.energyAvailable));
        }
        // this room only use harvester
        else {
            name = this.create_big_creep(max_energy, "harvester");
            if (name === ERR_NOT_ENOUGH_ENERGY && num_creeps.harvester === 0) {
                //console.log(this.name+' '+this.room.energyAvailable);
                name = this.create_big_creep(this.room.energyAvailable, "harvester");
            }
        }
    }

    if (name == undefined) {
        for (let role of roles) {
            if (role === "harvester") {
                continue;
            }
            if (num_creeps[role] < this.room.memory.min_creeps[role]) {
                if (role === "miner") {
                    name = this.create_miner(max_energy, creeps);
                } else if (role === "linker") {
                    name = this.create_linker(max_energy, creeps);
                } else if (role === "repairer") {
                    name = this.create_big_creep(Math.min(400, max_energy), role);
                } else {
                    name = this.create_big_creep(max_energy, role);
                }
            }
        }
    }

    if (name != undefined && !(name < 0)) {
        console.log(this.name+" spawned new creep: " + name);
        /*
        console.log("harvester: " + num_harvester);
        console.log("upgrader: " + num_upgrader);
        console.log("builder: " + num_builder);
        console.log("repairer: " + num_repairer);
        console.log("wall repairer: " + num_wall_repairer + "\n\n");
        */
    }
};


// create a new function to spawn big creep
StructureSpawn.prototype.create_big_creep = function (energy, role_name) {
    let n = Math.floor(energy / 200);
    let body = [];
    for (let i = 0; i < n; i++) {
        body.push(WORK, CARRY, MOVE);
    }
    return this.createCreep(body, undefined, {role: role_name, working: false});
};

StructureSpawn.prototype.create_miner = function (energy, creeps) {

    let source_id, container_id;
    let containers = this.room.memory.container;

    for (let id of containers) {
        if (!_.some(creeps, c => c.memory.role === "miner" && c.memory.container_id === id)) {
            container_id = id;
            let container = Game.getObjectById(container_id);
            let source = container.pos.findInRange(FIND_SOURCES, 1);
            if (source.length > 0) {
                source_id = source[0].id;
                break;
            }
        }
    }

    let body = [], n = 5;
    energy -= 50;
    while (n > 0 && energy > 100) {
        body.push(WORK);
        n -= 1;
        energy -= 100;
    }
    if (body.length > 0) {
        body.push(MOVE);
    }
    return this.createCreep(body, undefined,
        {role: "miner", working: false, source_id: source_id, container_id: container_id});
};

StructureSpawn.prototype.create_linker = function (energy, creeps) {
    let source_id, link_id;
    let links = this.room.memory.link.send;

    for (let id of links) {
        if (!_.some(creeps, c => c.memory.role === "linker" && c.memory.link_id === id)) {
            link_id = id;
            let link = Game.getObjectById(link_id);
            let source = link.pos.findInRange(FIND_SOURCES, 2);
            if (source.length > 0) {
                source_id = source[0].id;
                break;
            }
        }
    }

    let n = Math.floor((energy - 100) / 100);
    n = Math.min(n, 5);
    let body = [];
    for (let i = 0; i < n; i++) {
        body.push(WORK);
    }

    return this.createCreep([].concat(MOVE, body, CARRY), undefined,
        {role: "linker", working: false, source_id: source_id, link_id: link_id});
};

StructureSpawn.prototype.create_carrier = function (energy) {
    // create a body with twice as many CARRY as MOVE parts
    let n = Math.floor(energy / 150);
    // make sure the creep is not too big (more than 50 parts)
    n = Math.min(n, Math.floor(50 / 3));
    let body = [];
    for (let i = 0; i < n; i++) {
        body.push(CARRY, CARRY, MOVE);
    }
    // create creep with the created body and the role 'carrier'
    return this.createCreep(body, undefined, {role: "carrier", working: false});
};

