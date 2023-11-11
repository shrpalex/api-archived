import { Make } from "@rbxts/altmake";
import { Game } from "shared/Game";

export class Panel {
    private Items: Array<Game.Types.AppendableItem> = [];
    private Modifiers: Array<Game.Types.AppendableModifier> = [];

    public readonly Instance: Game.Types.Panel;

    constructor(Parent?: Game.Types.Layer) {

        this.Instance = Make("CanvasGroup", {
            Parent: Parent
        });
    }

    public AppendItem(Object: Game.Types.AppendableItem) {
        Object.Parent = this.Instance;
        
        this.Items.push(Object);
    }

    public AppendModifier(Cst: Game.Types.AppendableModifier) {
        Cst.Parent = this.Instance;

        this.Modifiers.push(Cst);
    }

    public Toggle() {
        this.Instance.Visible = !this.Instance.Visible;
    }

    public SetVisible(e: boolean = true) {
        this.Instance.Visible = e;
    }
}

export class StyledPanel {
    private Items: Array<Game.Types.AppendableItem> = [];
    private Modifiers: Array<Game.Types.AppendableModifier> = [];
    
    public readonly Instance: Game.Types.Panel;

    constructor(ff: number, Parent?: Game.Types.Layer) {

        const PanelStyle = (ff & Game.Flags.PanelFlag.Bland) === 1 || (ff & Game.Flags.PanelFlag.Decorated) === 1 || (ff & Game.Flags.PanelFlag.Custom) === 1;
        
        // todo style panel

        this.Instance = Make((ff & Game.Flags.PanelFlag.BaseFrame) === 1 ? "Frame" : "CanvasGroup", {
            Parent: Parent
        });
    }

    private AppendItem(Object: Game.Types.AppendableItem) {
        Object.Parent = this.Instance;
        
        this.Items.push(Object);
    }

    private AppendModifier(Cst: Game.Types.AppendableModifier) {
        Cst.Parent = this.Instance;

        this.Modifiers.push(Cst);
    }
    
    public Toggle() {
        this.Instance.Visible = !this.Instance.Visible;
    }

    public SetVisible(e: boolean = true) {
        this.Instance.Visible = e;
    }
}