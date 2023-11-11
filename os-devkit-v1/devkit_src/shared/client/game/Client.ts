import { Game } from "shared/Game";

export type INPUTENTRY = (Label: number, IState: Enum.UserInputState, IObject: InputObject) => any;

interface ClientCharacter {
    Model: Model,

    Root: BasePart,
    Humanoid: Humanoid
}

export class Client {
    // Properties

    private DeathConnection: RBXScriptConnection;

    public Instance: Player;
    public Character: ClientCharacter;

    public readonly ClientInput: INPUTENTRY = (Label: number, IState: Enum.UserInputState, IObject: InputObject) => {
        switch(Label) {
            case Game.Enums.InputLabels.RUN:
                break;
            case Game.Enums.InputLabels.CROUCH:
                break;
            default:
                break;
        }

        return Game.SUCCESS;
    }

    // Self-explanatory

    constructor(Source: Player) {
        this.Instance = Source;
        
        const Character = this.Instance.Character || this.Instance.CharacterAdded.Wait()[0];
        
        this.Character = {
            Model: Character,
            
            Root: Character.WaitForChild("HumanoidRootPart") as BasePart,
            Humanoid: Character.WaitForChild("Humanoid") as Humanoid
        };

        this.DeathConnection = this.Character.Humanoid.Died.Connect(this.UpdateCharacter);
    }

    // Methods

    private UpdateCharacter() {
        if (this.Character.Model) return;

        const Character = this.Instance.Character || this.Instance.CharacterAdded.Wait()[0];
        
        this.Character = {
            Model: Character,
            
            Root: Character.WaitForChild("HumanoidRootPart") as BasePart,
            Humanoid: Character.WaitForChild("Humanoid") as Humanoid
        };
    }
}