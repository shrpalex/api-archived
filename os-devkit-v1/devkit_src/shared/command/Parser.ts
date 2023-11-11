// these are only the Client Commands

import { Command, CommandArgs } from "./Command";

const Commands: Array<Command> = [
    new Command("test", "Test Command.", (Player: Player, Args: CommandArgs) => {
        print("Ran Test Command. Args: " + Args.Source.join(" "));
    },),

    new Command("make", "Creates a new Game Object", (Player: Player, Args: CommandArgs) => {
        // todo
    }, undefined, ["create", "new", "mk"])
];