import { Make } from "@rbxts/altmake";
import { DebugLayer, InstanceableLayer, ReservedLayer } from "./Layer";

export class _root {
    private Instance: ScreenGui;

    //~ Layers ~//

    public readonly Debug: DebugLayer; // Debug <-- fixed constraints
    public readonly Game: ReservedLayer;
    public readonly Top: ReservedLayer;
    public readonly Add: ReservedLayer;

    //~ Game Objects ~//

    public Spawnmenu: undefined;

    // -- Methods -- //
    
    constructor(Parent?: PlayerGui | ScreenGui) {
        this.Instance = Make("ScreenGui", {
            Parent: Parent
        });

        //~ Layer Generation ~//

        this.Debug = new DebugLayer();
        this.Game = new ReservedLayer();
        this.Top = new ReservedLayer();
        this.Add = new ReservedLayer();
    }

    // mount function

    public mount(Root: PlayerGui | ScreenGui) {
        this.Instance.Parent = Root;
    }
}