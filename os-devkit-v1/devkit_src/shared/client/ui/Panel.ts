import { Make } from "@rbxts/altmake";
import { Game } from "shared/Game";

export abstract class _InhPanel {
    private readonly Item: Game.types.Array<Game.types.AppendableItem> = [];

    public AppendItem(Object: Game.types.AppendableItem) {
        this.Item.push(Object);
    }
}

export class Panel extends _InhPanel {
    public readonly Instance: Game.types.AppendableItem;

    constructor(Parent?: Game.types.Layer) {
        super();

        this.Instance = Make("CanvasGroup", {
            Parent: Parent
        });
    }
}

export class StyledPanel extends _InhPanel {
    public readonly Instance: Game.types.Layer;

    constructor(ff: number, Parent?: Game.types.Layer) {
        super();

        const PanelStyle = (ff & Game.PanelFlag.Bland) === 1 || (ff & Game.PanelFlag.Decorated) === 1 || (ff & Game.PanelFlag.Custom) === 1;
        
        // todo style panel

        this.Instance = Make((ff & Game.PanelFlag.BaseFrame) === 1 ? "Frame" : "CanvasGroup", {
            Parent: Parent
        });
    }
}