export class JoystickMovement {
    /** the identifier of the touch/mouse that triggered it*/
    identifier: number;
    /** absolute position of the center in pixels */
    position: {
        x: number,
        y: number
    };
    /** strength in % */
    force: number;
    /** distance from center in pixels*/
    distance: number;
    /** the pressure applied by the touch */
    pressure: number;
    angle: {
        /** angle in radian */
        radian: number,
        /** angle in degree */
        degree: number
    };
    /** the joystick instance that triggered the event */
    instance: any

    constructor() { }
}
