var roles = ["harvester", "miner", "linker", "carrrier", "upgrader", "repairer", "builder", "wall_repairer"];

StructureSpawn.prototype.run = function () {
    let creeps = this.room.find(FIND_MY_CREEPS);
    let num_creeps = {};
    for (let role of roles) {
        num_creeps[role] = _.sum(creeps, c => c.memory.role === role);
    }
    let max_energy = Math.min(1200, this.room.energyCapacityAvailable);
    let name = undefined;

    //backup solution to create creeps after run out
    if (num_creeps.harvester === 0 && num_creeps.carrier === 0) {
        if (num_creeps.miner > 0 || (this.room.storage !== undefined &&
            this.room.storage.store[RESOURCE_ENERGY] >= 150 + 550)) {
            name = this.create_carrier(150);
        } else {
            name = this.create_big_creep(room.energy_available, "harvester");
        }
    }

    if (name === undefined) {
        for (let role of roles) {
            if (role === "miner" && num_creeps[role] < this.room.memory.creeps.min_miner) {
                name = this.create_miner()
            } else if (role === "linker" && num_creeps[role] < this.room.memory.creeps.min_linker) {
                name = this.create_linker();
            } else {
                name = this.create_big_creep(max_energy, role);
            }
        }
    }

    if (!(name < 0)) {
        console.log("Spawned new creep: " + name);
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

StructureSpawn.prototype.create_miner = function () {
    let n = Math.floor(energy / 200);
    let body = [];
    for (let i = 0; i < n; i++) {
        body.push(WORK, CARRY, MOVE);
    }
    return this.createCreep(body, undefined, {role: "miner", working: false});
};

StructureSpawn.prototype.create_linker = function () {
    let n = Math.floor(energy / 200);
    let body = [];
    for (let i = 0; i < n; i++) {
        body.push(WORK, CARRY, MOVE);
    }
    return this.createCreep(body, undefined, {role: "linker", working: false});
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

    // create creep with the created body and the role 'lorry'
    return this.createCreep(body, undefined, {role: 'lorry', working: false});
};

