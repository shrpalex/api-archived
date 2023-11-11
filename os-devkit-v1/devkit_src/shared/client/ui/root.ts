import { Make } from "@rbxts/altmake";
import { DebugLayer, InstanceableLayer, ReservedLayer } from "./Layer";
import { Spawnmenu } from "./component/Spawnmenu";

export class _root {
    // -- Properties -- //

    private Instance: ScreenGui;

    //~ Layers ~//

    public readonly Debug: DebugLayer; // Debug <-- fixed constraints
    public readonly Game: ReservedLayer;
    public readonly Top: ReservedLayer;
    public readonly Add: ReservedLayer;

    //~ Game Objects ~//

    public Spawnmenu: Spawnmenu;
    
    // constructor //

    constructor(Parent?: PlayerGui | StarterGui) {
        this.Instance = Make("ScreenGui", {
            Parent: Parent
        });

        //~ Layer Generation ~//

        this.Debug = new DebugLayer();
        this.Game = new ReservedLayer();
        this.Top = new ReservedLayer();
        this.Add = new ReservedLayer();

        //~ Adding stuff ~//

        this.Spawnmenu = new Spawnmenu();
    }

    // -- Methods -- //

    public Mount(Root: PlayerGui | ScreenGui) {
        this.Instance.Parent = Root;
    }

    public Toggle() {
        this.Instance.Enabled = !this.Instance.Enabled;
    }

    public SetEnabled(e: boolean = true) {
        this.Instance.Enabled = e;
    }
}