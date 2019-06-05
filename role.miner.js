module.exports = {
    /**
     * @source_id
     * @container_id
     * @working
     */
    run: function (creep) {
        if (creep.memory.working === true) {
            let source = Game.getObjectById(creep.memory.source_id)
            creep.harvest(source);
        } else {
            let container = Game.getObjectById(creep.memory.container_id);
            if (creep.pos.isEqualTo(container)) {
                creep.memory.work = true;
            } else {
                creep.moveTo(container);
            }
        }
    }
};