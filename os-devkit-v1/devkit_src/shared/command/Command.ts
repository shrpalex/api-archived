import { Players } from "@rbxts/services";

export class CommandArgs {
    public Source: Array<string> = [];

    constructor(Source: Array<string> = []) {
        this.Source = Source;
    }

    public IsEmpty() {
        return this.Source.isEmpty();
    }

    public arg_exists(i: number): boolean {
        return typeOf(this.Source[i]) !== "nil";
    }

    public arg_number(i: number): number | void {
        return this.arg_exists(i) ? tonumber(this.Source[i]) : undefined;
    }

    public arg_player(i: number, important: boolean = true): Player | void {
        if (!this.arg_exists(i)) return;

        const nsource = this.Source[i].lower();

        return Players.GetPlayers().find((Player: Player) => {
            const name = Player.Name.lower(), dname = Player.DisplayName.lower();
            return (important ? (name === nsource) : (name.find(nsource)[0] !== undefined || dname.find(nsource)[0] !== undefined));
        });
    }
}

export class Command {
    // Properties
    
    public readonly Name: string;
    public readonly Aliases: Array<string>;
    public readonly Description: string;

    private readonly Min_INT: number; // Minimum Permission Integer to run the Command
    protected Callback: (Player: Player, Args: CommandArgs) => any;

    constructor(Name: string, Description: string, Callback: (Player: Player, Args: CommandArgs) => any, Min_INT: number = 0, Aliases: Array<string> = []) {
        this.Name = Name;
        this.Aliases = Aliases || [];
        this.Description = Description;
        this.Min_INT = Min_INT;
        this.Callback = Callback;
    }

    public Run(Player: Player, Args: CommandArgs) {
        this.Callback(Player, Args);
    }
}