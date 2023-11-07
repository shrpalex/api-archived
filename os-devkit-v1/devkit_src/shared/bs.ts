// bs.ts (data namespace)

export namespace bs {
    // typedefs

    export namespace types {
        export type Array<T> = T[];
        export type Layer = CanvasGroup | Frame; // layer instance stuff
        export type Panel = CanvasGroup | Frame; // panel instance stuff
    
        export type AppendableItem = GuiObject;
        export type AppendableModifier = UIBase | UIComponent | UIConstraint | UILayout;
    }

    // bitflags

    export const LayerFlag = {
        Group: 0x0,
        BaseFrame: 0x1,
    };

    export const PanelFlag = {

        Decorated: 0x000,
        Bland: 0x010,
        Custom: 0x011,

        Group: 0x100,
        BaseFrame: 0x101

        // todo add more flags
    }

    // predefined styles and colors

    export const Background = Color3.fromRGB(0, 0, 0);

    // common stuff

    export namespace utils {
        export function fixedpoint(n: number, precision: number) {
            if (precision < 0) return;

            return math.floor(n * math.pow(10, precision)) / math.pow(10, precision);
        }
    }
}