var roles = {
    harvester: require("role.harvester"),
    miner: require("role.miner"),
    linker: require("role.linker"),
    carrier: require("role.carrier"),
    upgrader: require("role.upgrader"),
    builder: require("role.builder"),
    repairer: require("role.repairer"),
    wall_repairer: require("role.wall_repairer"),
    claimer: require("role.claimer")
};

Creep.prototype.run = function () {
    if (this.memory.role != undefined) {
        roles[this.memory.role].run(this);
    }
};

Creep.prototype.update_working_status = function () {
    if (this.memory.working === true && this.carry.energy === 0) {
        this.memory.working = false;
    } else if (this.memory.working === false && this.carry.energy === this.carryCapacity) {
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
    } else if (use_storage && this.room.storage != undefined) {
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
    }
};