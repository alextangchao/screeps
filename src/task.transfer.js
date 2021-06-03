module.exports = {
    run: function (creep, from_id, to_id, resource_type, stand_on_pos = false) {
        if (creep.withdraw(Game.getObjectById(from_id), resource_type) === ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(from_id), {visualizePathStyle: {}});
        }
        if (creep.transfer(Game.getObjectById(to_id), resource_type) === ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(to_id), {visualizePathStyle: {}});
        }
    },

    finish: function (creep, from_id, to_id, resource_type, stand_on_pos = false) {
        return stand_on_pos ? creep.pos.isEqualTo(Game.getObjectById(to_id)) : creep.pos.isNearTo(Game.getObjectById(to_id));
    }
}