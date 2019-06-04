var roles = {
    harvester: require("role.harvester"),
    miner: require("role.miner"),
    carrier: require("role.carrier"),
    upgrader: require("role.upgrader"),
    builder: require("role.builder"),
    repairer: require("role.repairer"),
    wall_repairer: require("role.wallRepairer"),
};

Creep.prototype.run = function () {
    this.update_working_status();
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

Creep.prototype.get_energy = function () {
    let sources = [];
    let source;
    let memory = this.room.memory;

    sources = sources.concat(this.get_container());
    sources = sources.concat(this.get_receive_link());
    sources = sources.concat(this.get_storage());

    if (sources.length > 0) {
        //console.log(sources.length);
        source = this.pos.findClosestByPath(sources);
        //console.log(source.pos);
        if (this.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(source);
        }
    } else {
        source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (this.harvest(source) == ERR_NOT_IN_RANGE) {
            this.moveTo(source);
        }
    }
};

Creep.prototype.get_container = function () {
    let container_id = this.room.memory.container;
    if (container_id === undefined) {
        return [];
    }
    let containers = [];
    for (let id of container_id) {
        let container = Game.getObjectById(id);
        if (container.store[RESOURCE_ENERGY] > 0) {
            containers.push(container);
        }
    }
    return containers;
};

Creep.prototype.get_storage = function () {
    let storage_id = this.room.memory.storage;
    if (storage_id === undefined) {
        return [];
    }
    let storage = Game.getObjectById(storage_id);
    if (storage.store[RESOURCE_ENERGY] > 0) {
        return [storage];
    }
    return [];
};

Creep.prototype.get_receive_link = function () {
    if (this.room.memory.link === undefined) {
        return [];
    }
    let link_id = this.room.memory.link["receive"];
    let links = [];
    for (let id of link_id) {
        let link = Game.getObjectById(id);
        if (link.energy > 0) {
            links.push(link);
        }
    }
    return links;
};