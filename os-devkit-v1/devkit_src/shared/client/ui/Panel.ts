import { Make } from "@rbxts/altmake";
import { bs } from "shared/bs";

export class Panel {
    public readonly Instance: bs.Layer;

    constructor(ff: number, Parent?: bs.Layer) {
        const PanelStyle = (ff & bs.PanelFlag.Bland) == 1 || (ff & bs.PanelFlag.Decorated) == 1 || (ff & bs.PanelFlag.Custom) == 1;
        
        // todo style panel

        this.Instance = Make((ff & bs.PanelFlag.BaseFrame) == 1 ? "Frame" : "CanvasGroup", {
            Parent: Parent
        })
    }
}