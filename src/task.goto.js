module.exports = {
    run: function (creep, pos, stand_on_pos = false) {
        creep.moveTo(pos, {visualizePathStyle: {}});
    },

    finish: function (creep, pos, stand_on_pos = false) {
        return stand_on_pos ? creep.pos.isEqualTo(pos) : creep.pos.isNearTo(pos);
    }
}