import { HassEvent, HassEntity } from "home-assistant-js-websocket"



export type CardConfig = {
    type: string;
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
}