let roles = {
    harvester: require("role.harvester"),
    miner: require("role.miner"),
    linker: require("role.linker"),
    carrier: require("role.carrier"),
    upgrader: require("role.upgrader"),
    builder: require("role.builder"),
    repairer: require("role.repairer"),
    wall_repairer: require("role.wall_repairer"),
    claimer: require("role.claimer"),
    attack: require("role.attack"),
    long_distance_worker: require("role.long_distance_worker")
};

Creep.prototype.run = function () {
    // if (this.memory.role != undefined) {
    //     roles[this.memory.role].run(this);
    // }

    let task = global.task.creeps[this.name];
    // console.log(JSON.stringify(task), JSON.stringify(global.task.creeps[this.name]));
    if (task !== undefined && task.func.finish(this, ...task.argument)) {
        task = global.task.creeps[this.name] = undefined;
        //TODO: move creep out of the road
    }
    if (task === undefined && global.task.rooms[this.room.name].length !== 0) {
        let num = global.task.rooms[this.room.name].length;
        task = global.task.creeps[this.name] = global.task.rooms[this.room.name].shift();
        // console.log("remove task from room");
        // console.log(this.room.name, num, "->", global.task.rooms[this.room.name].length);
        //task = global.task.creeps[this.name];
    }
    //console.log(JSON.stringify(task),JSON.stringify(global.task.creeps[this.name]));
    if (task !== undefined) {
        this.say(task.name);
        // console.log(this.name, "has task");
        // console.log(JSON.stringify(task));
        task.func.run(this, ...task.argument);
    }
    // console.log(JSON.stringify(global.task.creeps[this.name]));
};

Creep.prototype.update_working_status = function () {
    if (this.memory.working === true && this.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
        this.memory.working = false;
    } else if (this.memory.working === false && this.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
        this.memory.working = true;
    }
};

Creep.prototype.get_energy = function (use_source = true, use_container_or_link = true, use_storage = true, source = undefined,) {
    let sources = this.room.memory.energy_available;

    if (use_container_or_link && sources.length > 0) {
        source = this.pos.findClosestByPath(sources);
        if (this.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            this.moveTo(source);
        }
        return "container";
    } else if (use_storage && this.room.storage != undefined && this.room.storage.store[RESOURCE_ENERGY] > 300) {
        let storage = this.room.storage;
        if (this.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            this.moveTo(storage);
        }
        return "storage";
    } else if (use_source) {
        if (source == undefined) {
            source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        }
        if (this.harvest(source) === ERR_NOT_IN_RANGE) {
            this.moveTo(source);
        }
        return "source";
    } else {
        return "None";
        let drop = this.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
        if (drop.length > 0) {
            this.pickup(drop[0]);
        }
    }

};