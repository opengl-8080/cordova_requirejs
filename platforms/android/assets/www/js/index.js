requirejs.config({
    paths: {
        'jquery': 'lib/jquery.min',
        'jquery-mobile': 'lib/jquery.mobile.min'
    }
});

require(['root', 'database', 'jquery-mobile'], function(root) {
    root.deviceready(function() {
        root.log('Hello Cordova with RequireJS!!');

        root.db.readTransaction(function(tx) {
            root.deferredTransaction(tx)
                .first('SELECT * FROM SAMPLE_TABLE')
                .done(function(exec, result) {
                    for (var i=0; i<result.rows.length; i++) {
                        var row = result.rows.item(i);
                        root.log('[database rows] id=' + row.ID + ', message=' + row.MESSAGE);
                    }
                });
        });
    });
});
