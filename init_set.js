module.exports = {
    run: function (room) {
        init_memory(room);
        room.memory.need_init = false;
        console.log("init setting");
    }
};

/**
 * Memory.rooms[room_name]:
 * @min_creeps {role:number}
 * @wall_hits {min:number,max:number}
 * @energy_available {list:{object}}
 * @container {list:{id}}
 * @link {receive:{list:{id}},send:{list:{id}}}
 * @need_init {bool}
 */
function init_memory(room) {
    //room.memory.energy_available = [];
    init_memory_wall_hits(room);
    init_memory_container(room);
    init_memory_link(room);
    init_creeps_num(room);
}

function init_creeps_num(room) {
    let min_harvester = 0;
    let min_carrier = 0;
    let min_upgrader = 0;
    let min_builder = 0;
    let min_repairer = 0;
    let min_wall_repairer = 0;

    set_min_creeps(room);
}

function set_min_creeps(room) {
    room.memory.min_creeps = {};
    let min_creeps = room.memory.min_creeps;

    min_creeps.harvester = 1;
    min_creeps.miner = 0;
    min_creeps.linker = 0;
    min_creeps.carrier = 1;
    min_creeps.upgrader = 1;
    min_creeps.builder = 0;
    min_creeps.repairer = 1;
    min_creeps.wall_repairer = 0;

    if (room.memory.container !== undefined) {
        min_creeps.miner = room.memory.container.length;
    }

    if (room.memory.link !== undefined) {
        let linker = 0;
        let send_links = room.memory.link.send;
        for (let id of send_links) {
            let send_link = Game.getObjectById(id);
            if (send_link.pos.findInRange(FIND_SOURCES, 2).length > 0) {
                linker++;
            }
        }
        min_creeps.linker = linker;
    }

    if (min_creeps.miner + min_creeps.linker === 0) {
        min_creeps.carrier = 0;
    }

    if (Object.getOwnPropertyNames(Game.constructionSites).length > 0) {
        min_creeps.builder = Math.max(1, min_creeps.builder);
    }

    min_creeps.all_creeps = min_creeps.harvester +
        min_creeps.miner + min_creeps.linker +
        min_creeps.carrier + min_creeps.upgrader +
        min_creeps.builder + min_creeps.repairer +
        min_creeps.wall_repairer;
}

function init_memory_wall_hits(room) {
    if (room.memory.wall_hits === undefined) {
        room.memory.wall_hits = {};
        room.memory.wall_hits.max = 1000000;
        room.memory.wall_hits.min = 100;
    }
}

function init_memory_container(room) {
    let containers = room.find(FIND_STRUCTURES,
        {filter: s => s.structureType === STRUCTURE_CONTAINER});
    if (containers.length === 0) {
        delete room.memory.container;
        return;
    }
    room.memory.container = [];
    for (let container of containers) {
        room.memory.container.push(container.id);
    }
}

function init_memory_link(room) {
    let links = room.find(FIND_STRUCTURES,
        {filter: s => s.structureType === STRUCTURE_LINK});
    if (links.length === 0) {
        delete room.memory.link;
        return;
    }
    room.memory.link = {
        receive: [],
        send: []
    };
    for (let link of links) {
        let type = "send";
        let storage = link.pos.findInRange(FIND_MY_STRUCTURES, 4,
            {filter: s => s.structureType === STRUCTURE_STORAGE});
        if (storage.length > 0) {
            type = "receive";
        }
        room.memory.link[type].push(link.id);
    }
}