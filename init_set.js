module.exports = {
    run: function (room) {
        init_memory(room);
    }
};

/**
 * Memory.rooms[room_name]: 
 * @wall_hits {min:number,max:number}
 * @container {list:{id}}
 * @storage {id}
 * @link {list:{id,type:{receive,send}}}
 */
function init_memory(room) {
    init_memory_wall_hits(room);
    init_memory_container(room);
    init_memory_storage(room);
    init_memory_link(room);
}

function init_memory_wall_hits(room) {
    if (room.memory.wall_hits === undefined) {
        room.memory.wall_hits = {};
        room.memory.wall_hits.max = 1000000;
        room.memory.wall_hits.min = 100;
    }
}

function init_memory_container(room) {
    room.memory.container = [];
    let containers = room.find(FIND_STRUCTURES,
        {filter: s => s.structureType == STRUCTURE_CONTAINER});
    if (containers === undefined) {
        return;
    }
    for (let container of containers) {
        /*
        let temp = {
            id: container.id,
            room: container.pos.roomName,
            x: container.pos.x,
            y: container.pos.y
        }
        */
        room.memory.container.push(container.id);
    }
}

function init_memory_storage(room) {
    let storage = room.find(FIND_MY_STRUCTURES,
        {filter: s => s.structureType == STRUCTURE_STORAGE});
    if (storage !== undefined) {
        room.memory.storage = storage[0].id;
    }

}

function init_memory_link(room) {
    room.memory.link = [];
    let links = room.find(FIND_STRUCTURES,
        {filter: s => s.structureType == STRUCTURE_LINK});
    if (links === undefined) {
        return;
    }
    for (let link of links) {
        let type = "send";
        let storage = link.pos.findInRange(FIND_MY_STRUCTURES, 2,
            {filter: s => s.structureType == STRUCTURE_STORAGE});
        if (storage.length > 0) {
            type = "receive";
        }
        let temp = {
            id: link.id,
            type: type
        };
        room.memory.link.push(temp);
    }

}