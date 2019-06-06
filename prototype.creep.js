var roles = {
    harvester: require("role.harvester"),
    miner: require("role.miner"),
    linker: require("role.linker"),
    carrier: require("role.carrier"),
    upgrader: require("role.upgrader"),
    builder: require("role.builder"),
    repairer: require("role.repairer"),
    wall_repairer: require("role.wallRepairer"),
};

Creep.prototype.run = function () {
    if (this.memory.role !== undefined) {
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

Creep.prototype.get_energy = function (use_container = true, source = undefined, use_source = true) {
    let sources = this.room.memory.energy_available;

    if (use_container && sources.length > 0) {
        //console.log(sources.length);
        source = this.pos.findClosestByPath(sources);
        //console.log(source.pos);
        if (this.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            this.moveTo(source);
        }
    } else if (use_source) {
        if (source === undefined) {
            source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        }
        if (this.harvest(source) === ERR_NOT_IN_RANGE) {
            this.moveTo(source);
        }
    }
};