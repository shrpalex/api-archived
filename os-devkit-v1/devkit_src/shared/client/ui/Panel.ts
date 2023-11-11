import { Make } from "@rbxts/altmake";
import { Game } from "shared/Game";

export abstract class _InhPanel {
    private readonly Item: Game.Types.Array<Game.Types.AppendableItem> = [];

    public AppendItem(Object: Game.Types.AppendableItem) {
        this.Item.push(Object);
    }
}

export class Panel extends _InhPanel {
    public readonly Instance: Game.Types.AppendableItem;

    constructor(Parent?: Game.Types.Layer) {
        super();

        this.Instance = Make("CanvasGroup", {
            Parent: Parent
        });
    }
}

export class StyledPanel extends _InhPanel {
    public readonly Instance: Game.Types.Layer;

    constructor(ff: number, Parent?: Game.Types.Layer) {
        super();

        const PanelStyle = (ff & Game.Flags.PanelFlag.Bland) === 1 || (ff & Game.Flags.PanelFlag.Decorated) === 1 || (ff & Game.Flags.PanelFlag.Custom) === 1;
        
        // todo style panel

        this.Instance = Make((ff & Game.Flags.PanelFlag.BaseFrame) === 1 ? "Frame" : "CanvasGroup", {
            Parent: Parent
        });
    }
}