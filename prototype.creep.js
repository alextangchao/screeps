var roles = {
    harvester: require("role.harvester"),
    //miner: require("role.miner"),
    //carrier: require("role.carrier"),
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

Creep.prototype.get_energy = function () {
    let sources = [];
    let memory = this.room.memory;

    if (memory.container !== undefined) {
        sources = sources.concat(memory.container.filter(function (id) {
            let container = Game.getObjectById(id);
            return container.store[RESOURCE_ENERGY] > 0;
        }));
    }
    if (memory.link !== undefined) {
        sources = sources.concat(this.room.memory.link.filter(function (item) {
            if (item.type === "send") {
                return false;
            }
            let link = Game.getObjectById(item.id);
            return link.energy > 0;
        }));
    }
    if (memory.storage !== undefined) {
        let storage = Game.getObjectById(this.room.memory.storage);
        if (storage.store[RESOURCE_ENERGY] > 0) {
            sources = sources.concat(storage);
        }
    }
    //console.log(sources[0]);
    let source = this.pos.findClosestByPath(sources);
    //console.log(source);
    this.moveTo(source);
};

Creep.prototype.get_avai = function () {

};