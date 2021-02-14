import          createMuiTheme          from '@material-ui/core/styles/createMuiTheme';

import          palette                 from '../theme/palette';
import          typography              from '../theme/typography';
import          overrides               from '../theme/overrides';

const theme = createMuiTheme({
        palette,
        typography,
        overrides,
        zIndex: {
                appBar:         1200,
                drawer:         1100
        }
});

export default theme;
