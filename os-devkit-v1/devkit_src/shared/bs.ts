// bs.ts (data namespace)

export namespace bs {
    // typedefs

    export type Array<T> = T[];
    export type Layer = CanvasGroup | Frame; // layer instance stuff

    // bitflags

    export const LayerFlag = {
        Group: 0x0,
        BaseFrame: 0x1,

        
    };

    // predefined styles and colors

    export const Background = Color3.fromRGB(0, 0, 0);
}