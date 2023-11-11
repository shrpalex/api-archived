// bs.ts (data namespace)

export namespace Game {
    export const SUCCESS = 0;
    export const ERROR = -1;
    export const MEH = -573;
    export const INF = math.huge;
    export const NINF = -math.huge;

    export namespace Data {
        // Character Stuff

        export const RUN_STEP = math.exp(1/2);
        export const CROUCH_STEP = math.exp(-1/2);

        export const DEFAULT_SPEED = 13;
        export const DEFAULT_PJUMP = 50;

        export const RUN_SPEED = DEFAULT_SPEED * RUN_STEP;
        export const RUN_PJUMP = DEFAULT_PJUMP - DEFAULT_SPEED * CROUCH_STEP;

        export const CROUCH_SPEED = DEFAULT_SPEED * CROUCH_STEP;
        export const CROUCH_PJUMP = DEFAULT_PJUMP - DEFAULT_SPEED * RUN_STEP;

        export const DEFAULT_FOV = 70;
        export const RUN_FOV = 85;
        export const CROUCH_FOV = 65;

        export const RUN_ACCEL_TIME = 0.25;
        export const RUN_FOV_TIME = 0.2;
    }

    export namespace Types {
        export type Layer = CanvasGroup | Frame; // layer instance stuff
        export type Panel = CanvasGroup | Frame; // panel instance stuff
    
        export type AppendableItem = GuiObject;
        export type AppendableModifier = UIBase | UIComponent | UIConstraint | UILayout;

        export type ICON = string;
    }

    export namespace Flags {
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
    }

    export namespace Enums {
        export enum InputLabels {
            // Physical

            RUN,
            CROUCH,
            SWALK,
            
            // Interaction

            GRAB,

            // UI

            PLAYERLIST,
            MENU,
            DEBUG,
            DEBUGCMOD,
            SPAWNMENU,
            CONSOLE
        }
    }

    export namespace Utils {
        export function FPoint(n: number, precision: number) {
            if (precision < 0) return;

            return math.floor(n * math.pow(10, precision)) / math.pow(10, precision);
        }

        export function Partition(arr: number[], left: number = 0, right: number = arr.size() - 1) {
            const pv = arr[math.floor((right + left / 2))];

            let i, j;
            i = left;
            j = right;

            while (i <= j) {
                while (arr[i] < pv) {
                    i++;
                }

                while (arr[j] > pv) {
                    j--;
                }

                if (i <= j) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];

                    i++;
                    j--;
                }
            }

            return i;
        }

        export function QSort(arr: number[], left: number = 0, right: number = arr.size() - 1) {
            let i;

            if (arr.size() <= 1) return arr;

            i = Partition(arr, left, right);

            if (left < i - 1) {
                QSort(arr, left, i - 1);
            }

            if (i < right) {
                QSort(arr, i, right);
            }

            return arr;
        }
    }
}