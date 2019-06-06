module.exports = {
    /**
     * @source_id
     * @link_id
     * @working
     */
    run: function (creep) {
        creep.update_working_status();
        if (creep.memory.working === true) {
            let link = Game.getObjectById(creep.memory.link_id);
            let status = creep.transfer(link, RESOURCE_ENERGY);
            if (status === ERR_NOT_IN_RANGE) {
                creep.moveTo(link);
            } else if (status === ERR_FULL) {
                let receives = creep.room.memory.link.receive;
                if (receives.length > 0) {
                    link.transferEnergy(Game.getObjectById(receives[0]));
                }
            }
        } else {
            let source = Game.getObjectById(creep.memory.source_id);
            creep.get_energy(false, source);
        }
    }
};