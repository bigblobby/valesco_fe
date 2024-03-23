import { Database } from '../../../types/supabase';

type WorkoutType = Database["public"]["Enums"]["workout type"];

const WorkoutUtils = {
    getTimeLength(time: number){
        if (time < 60) {
            return `${time} mins`;
        } else if (time === 60) {
            return `1 hour`;
        } else if (time > 60) {
            return `${time / 60} hours`;
        } else {
            return time;
        }
    },

    getTypeName(type: WorkoutType) {
        switch (type) {
            case 'gym_class':
                return 'Gym class';
            case 'wod':
                return 'WOD';
            case 'hero':
                return 'Hero WOD';
        }
    }
};

export default WorkoutUtils;