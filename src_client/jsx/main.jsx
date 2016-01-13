'use strict';
debugger;
import 'preloader';

import routes from 'routes';
import router from 'global/router';


Pace.once('hide', () => {
  $('#pace-loader').removeClass('pace-big').addClass('pace-small');
});

module.exports = router(routes);
