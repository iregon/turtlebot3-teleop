import { Message } from 'roslib';
export class TurtlebotMessage extends Message{
    constructor(options: {
        linear?: {
            x?: number,
            y?: number,
            z?: number
        },
        angular?: {
            x?: number,
            y?: number,
            z?: number
        }
    }) {
        super(options);
    }
}
