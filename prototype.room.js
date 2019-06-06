Room.prototype.run = function () {
    this.cal_energy_available();
};

Room.prototype.cal_energy_available = function () {
    let sources = [].concat(this.get_container(), this.get_receive_link());
    if (sources.length === 0) {
        sources = [].concat(this.get_storage());
    }
    //console.log(this.name+sources.length);
    this.memory.energy_available = sources;
};

Room.prototype.get_container = function () {
    let container_id = this.memory.container;
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

Room.prototype.get_storage = function () {
    let storage = this.storage;
    if (storage !== undefined && storage.store[RESOURCE_ENERGY] > 0) {
        return [storage];
    }
    return [];
};

Room.prototype.get_receive_link = function () {
    if (this.memory.link === undefined) {
        return [];
    }
    let link_id = this.memory.link.receive;
    let links = [];
    for (let id of link_id) {
        let link = Game.getObjectById(id);
        if (link.energy > 0) {
            links.push(link);
        }
    }
    return links;
};