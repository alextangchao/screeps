module.exports =
    class pq {
        constructor(events = undefined) {
            if (events === undefined) {
                this.events = [null];
                this.num = 0;
            } else {
                this.events = events;
                this.num = this.events.length - 1;
            }
            return this
        }

        recover(events) {
            this.events = events;
        }

        empty() {
            return this.size() === 0
        }

        size() {
            return this.num;
        }

        push(event) {
            if (event.time === undefined) {
                event.time = Game.time;
            }
            this.events.push(event)
            this.num++;
            this.move_up(this.num);
        }

        top() {
            if (this.num === 0) {
                return undefined;
            }
            return this.events[1];
        }

        pop() {
            if (this.num === 0) {
                return undefined;
            }
            if (this.size() === 1) {
                this.num--;
                return this.events.pop();
            }
            let event = this.events[1];
            this.events[1] = this.events[this.size()];
            this.events.pop();
            this.num--;
            this.move_down(1);
            return event;
        }

        move_up(index) {
            let parent_index = this.get_parent(index);
            if (parent_index === 0) {
                return;
            }
            while (this.events[index].time < this.events[parent_index].time) {
                this.change_event(index, parent_index);
                index = parent_index;
                parent_index = this.get_parent(index);
                if (parent_index === 0) {
                    return;
                }
            }
        }

        move_down(index) {
            let left_index = this.get_left_child(index);
            let right_index = this.get_right_child(index);
            let change_index;
            while (left_index <= this.size() && right_index <= this.size()
            && (this.events[index].time > this.events[left_index].time || this.events[index].time > this.events[right_index].time)) {
                if (this.events[left_index].time < this.events[right_index].time) {
                    change_index = left_index;
                } else {
                    change_index = right_index;
                }
                this.change_event(index, change_index);
                index = change_index;
                left_index = this.get_left_child(index);
                right_index = this.get_right_child(index);
            }
            if (left_index <= this.size() && this.events[index].time > this.events[left_index].time) {
                this.change_event(index, left_index);
            } else if (right_index <= this.size() && this.events[index].time > this.events[right_index].time) {
                this.change_event(index, right_index);
            }
        }

        change_event(index1, index2) {
            let temp = this.events[index1];
            this.events[index1] = this.events[index2];
            this.events[index2] = temp;
        }

        get_parent(index) {
            return index >> 1;
        }

        get_left_child(index) {
            return index << 1;
        }

        get_right_child(index) {
            return (index << 1) + 1;
        }
    }