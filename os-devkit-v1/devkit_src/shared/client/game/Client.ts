import { Game } from "shared/Game";

export type INPUTENTRY = (Label: string, IState: Enum.UserInputState, IObject: InputObject) => any;

interface ClientCharacter {
    Model: Model,

    Root: BasePart,
    Humanoid: Humanoid
}

export class Client {
    private DeathConnection: RBXScriptConnection;

    public Instance: Player;
    public Character: ClientCharacter;

    public readonly ClientInput: INPUTENTRY = (Label: string, IState: Enum.UserInputState, IObject: InputObject) => {
        switch(Label) {
            default:
                break;
        }

        return Game.SUCCESS;
    }

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