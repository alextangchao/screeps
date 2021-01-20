let tasks = require("task.import");

module.exports = function () {
    //resume tasks back from memory
    global.task = {
        rooms: {},
        creeps: {}
    };
    for (let room_name in Game.rooms) {
        let room_task = Game.rooms[room_name].memory.task;
        global.task.rooms[room_name] = (room_task === undefined) ? [] : room_task;
        for (let i = 0, len = global.task.rooms[room_name].length; i < len; i++) {
            resume_lost_info(global.task.rooms[room_name][i]);
        }
    }
    for (let creep_name in Game.creeps) {
        global.task.creeps[creep_name] = Game.creeps[creep_name].memory.task;
        resume_lost_info(global.task.creeps[creep_name]);
    }
}

//add missing function back to task
function resume_lost_info(task) {
    if (task === undefined) {
        return;
    }
    //console.log("add function back to task");
    // console.log(JSON.stringify(task[i]));
    // console.log("name",JSON.stringify(task[i].name));
    //console.log(JSON.stringify(require("task.goto")));
    // console.log(Object.keys(tasks.goto),typeof(tasks.goto.run));
    //add missing function back to task
    task.func = tasks[task.name];
    resume_pos(task.argument);
}

function resume_pos(obj_array) {
    //console.log(JSON.stringify(obj_array));
    if (Array.isArray(obj_array)) {
        for (let i = 0, len = obj_array.length; i < len; i++) {
            let type = Object.prototype.toString.call(obj_array[i]);
            if (type === '[object Object]') {
                if ("x" in obj_array[i] && "y" in obj_array[i] && "roomName" in obj_array[i]) {
                    //obj_array[i] = new RoomPosition(obj_array[i].x, obj_array[i].y, obj_array[i].roomName);
                    obj_array[i] = _.extend(Object.create(RoomPosition.prototype), obj_array[i]);
                    console.log("resume", obj_array[i])
                } else {
                    resume_pos(obj_array[i]);
                }
            } else if (type === '[object Array]') {
                resume_pos(obj_array[i]);
            }
        }
    }
}