import          colorIndigo             from '@material-ui/core/colors/indigo';
import          colorBlue               from '@material-ui/core/colors/blue';
import          colorGreen              from '@material-ui/core/colors/green';
import          colorOrange             from '@material-ui/core/colors/orange';
import          colorRed                from '@material-ui/core/colors/red';
import          colorPink               from '@material-ui/core/colors/pink';
import          colorBlueGrey           from '@material-ui/core/colors/blueGrey';
import          colorGrey               from '@material-ui/core/colors/grey';
import          colorBrown              from '@material-ui/core/colors/brown';
import          colorYellow             from '@material-ui/core/colors/yellow';


var             white = '#FFFFFF';
var             black = '#000000';

export default {
        black,
        white,
        // default: {
        //         contrastText:   white,
        //         dark:           colorIndigo[900],
        //         main:           colorIndigo[500],
        //         light:          colorIndigo[100]
        // },
        primary: {
                contrastText:   white,
                dark:           colorIndigo[900],
                main:           colorIndigo[500],
                light:          colorIndigo[100]
        },
        secondary: {
                contrastText:   white,
                dark:           colorPink[900],
                main:           colorPink['A700'],
                light:          colorPink['A400']
        },
        success: {
                contrastText:   white,
                dark:           colorGreen[900],
                main:           colorGreen[600],
                light:          colorGreen[400]
        },
        info: {
                contrastText:   white,
                dark:           colorBlue[900],
                main:           colorBlue[600],
                light:          colorBlue[400]
        },
        warning: {
                contrastText:   white,
                dark:           colorOrange[900],
                main:           colorOrange[600],
                light:          colorOrange[400]
        },
        error: {
                contrastText:   white,
                dark:           colorRed[900],
                main:           colorRed[600],
                light:          colorRed[400]
        },
        text: {
                primary:        colorBlueGrey[900],
                secondary:      colorBlueGrey[600],
                link:           colorBlue[600]
        },
        price: {
                primary:        colorBrown[900],
                secondary:      colorBrown[600],
                link:           colorBrown[400],
        },
        action: {
                primary:        colorYellow[900],
                secondary:      colorYellow[600],
                link:           colorYellow[400],
        },
        background: {
                default:        '#F4F6F8',
                paper:          white
        },
        icon:                   colorBlueGrey[600],
        divider:                colorGrey[200]
};
