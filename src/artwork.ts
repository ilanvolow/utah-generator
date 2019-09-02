
const chalk = require('chalk');

let landingCraft =
"            \\0\\     Ø    Ø    Ø    Ø      +______.--.          +______.--.          ############  \n" +
"             \\0\\  -[/] -[/] -[/] -[/]       _ ==='=='=-/         _ ==='=='=-/      ####_##_##-### \n" +
"              \\0\\_ /_\\  /_\\_ /_\\_ /_\\______(O++o++o+++O)_____   (O++o++o+++O)______####_####-#### \n" +
"               \\0 ####################################################################_####_###   \n" +
"                \\############################################################################     \n";

let water =
" ^^^^^ ^^^^^^^^^^^^^^^^^^^^^     ^^^^^ ^^^^^^^^^^^^^^^^^^^^^ ^^^^^ ^^^^^^^^^^^^^^^^^^^^^          \n" +
"   ^^^^      ^^^^     ^^^    ^^     ^^^^      ^^^^     ^^^    ^^    ^^^^      ^^^^     ^^^        \n" +
"        ^^^^      ^^^     ^^^^      ^^^   ^^^^      ^^^   ^^^^      ^^      ^^^^      ^^^         \n";


class ArtworkPrinter {

    static printArtwork() {
        console.log(landingCraft);

        console.log(chalk.blue(water));
    }
}
export default ArtworkPrinter;
