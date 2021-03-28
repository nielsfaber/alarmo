<<<<<<< HEAD
import { HassEvent, HassEntity } from "home-assistant-js-websocket"
=======
>>>>>>> 6190b6ef6d4619f7b2b4e1a6c3b2d7568e02a303



export type CardConfig = {
    type: string;
<<<<<<< HEAD
    entity: string
}

export type AlarmoEvent = HassEvent & {
    data: { [key: string]: any } & {
        event: string,
        area_id: string,
    }
}

export type AlarmoEntity = HassEntity & {
    attributes: {
        arm_mode?: string,
        open_sensors?: null | { [key: string]: string },
        delay?: number,
        expiration?: string,
        code_format?: string,
        code_arm_required?: boolean
    }
=======
    entity: string,
>>>>>>> 6190b6ef6d4619f7b2b4e1a6c3b2d7568e02a303
}