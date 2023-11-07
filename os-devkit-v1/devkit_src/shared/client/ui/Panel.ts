import { Make } from "@rbxts/altmake";
import { bs } from "shared/bs";

export abstract class _InhPanel {
    private readonly Item: bs.types.AppendableItem[] = [];

    public AppendItem(Object: bs.types.AppendableItem) {
        this.Item.push(Object);
    }
}

export class Panel extends _InhPanel {
    public readonly Instance: bs.types.AppendableItem;

    constructor(Parent?: bs.types.Layer) {
        super();

        this.Instance = Make("CanvasGroup", {
            Parent: Parent
        });
    }
}

export class StyledPanel extends _InhPanel {
    public readonly Instance: bs.types.Layer;

    constructor(ff: number, Parent?: bs.types.Layer) {
        super();

        const PanelStyle = (ff & bs.PanelFlag.Bland) == 1 || (ff & bs.PanelFlag.Decorated) == 1 || (ff & bs.PanelFlag.Custom) == 1;
        
        // todo style panel

        this.Instance = Make((ff & bs.PanelFlag.BaseFrame) == 1 ? "Frame" : "CanvasGroup", {
            Parent: Parent
        });
    }
}