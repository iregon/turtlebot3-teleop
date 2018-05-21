import { Settings } from './../providers/settings/settings';
import { JoystickMovement, TurtlebotMessage } from '.';

export class TurtleBotMessageFactory {
    private speedStrategy: SpeedStrategy;
    private angleStrategy: AngleStrategy;

    constructor(settingsService: Settings) {
        this.speedStrategy = new SpeedStrategy(settingsService);
        this.angleStrategy = new AngleStrategy(settingsService);
    }

    create(data: JoystickMovement): TurtlebotMessage {
        let speed = this.speedStrategy.calculateSpeed(data.force);
        let angle = this.angleStrategy.calculateAngle(data.angle.radian);

        return new TurtlebotMessage({
            linear: {
                x: speed
            },
            angular: {
                z: angle
            }
        });
    }
}

class SpeedStrategy {
    private readonly MAX_FORCE: number;
    private readonly MAX_SPEED: number;

    constructor(private settingsService: Settings) {
        this.MAX_FORCE = this.settingsService.getValue('maxForce');
        this.MAX_SPEED = this.settingsService.getValue('maxSpeed');
    }

    calculateSpeed(force: number): number {
        if (force > this.MAX_FORCE) force = this.MAX_FORCE;

        return force / this.MAX_FORCE * this.MAX_SPEED;
    }
}

class AngleStrategy {
    private readonly DEGREE_360 = 2 * Math.PI;
    private readonly DEGREE_180 = Math.PI;
    // private readonly DEGREE_90 = Math.PI / 2;
    private readonly INITIAL_ANGLE = 0;

    private lastAngle: number;

    constructor(private settingsService: Settings) {
        let angle = this.settingsService.getValue('initialAngle');
        if (angle) {
            this.INITIAL_ANGLE = angle.radian || this.convertToRadian(angle.degree);
        }
    }

    /** Calculate angle in radian based on joystick angle */
    calculateAngle(angle: number) {
        angle -= this.INITIAL_ANGLE;
        let newAngle = angle;
        if (this.lastAngle && this.lastAngle != 0)
            newAngle -= this.lastAngle;
        this.lastAngle = angle;

        return this.translateToPI(newAngle);
    }

    /** Translate a 2π angle to a -/+ π angle*/
    private translateToPI(angle: number) {
        if (angle > this.DEGREE_180) return this.DEGREE_360 - angle;
        if (angle < (- this.DEGREE_180)) return this.DEGREE_360 + angle;
        return angle;
    }

    private convertToRadian(angle: number) {
        return angle / 180 * this.DEGREE_180
    }
}