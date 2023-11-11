// bs.ts (data namespace)

export namespace Game {
    export const SUCCESS = 0;
    export const ERROR = -1;
    export const MEH = -573;
    export const INF = math.huge;
    export const NINF = -math.huge;

    export namespace Types {
        export type Array<T> = T[];
        export type Layer = CanvasGroup | Frame; // layer instance stuff
        export type Panel = CanvasGroup | Frame; // panel instance stuff
    
        export type AppendableItem = GuiObject;
        export type AppendableModifier = UIBase | UIComponent | UIConstraint | UILayout;
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