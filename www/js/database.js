define(['root', 'jquery'], function(root, $) {
    root.deviceready(function() {
        root.log('initializing database...');

        root.db = openDatabase('sampledb', '', 'Sample Database', 1024 * 1024 * 10);

        root.db.transaction(
            function(tx) {
                root
                    .deferredTransaction(tx)
                    .executeSql('CREATE TABLE IF NOT EXISTS SAMPLE_TABLE (ID INTEGER PRIMARY KEY, MESSAGE)')
                    .then(function(dtx, result) {
                        return dtx.executeSql('SELECT * FROM SAMPLE_TABLE');
                    })
                    .then(function(dtx, result) {
                        if (result.rows.length === 0) {
                            return dtx.executeSql('INSERT INTO SAMPLE_TABLE (MESSAGE) VALUES (?)', ['database message 1'])
                                .then(function(dtx, result) {
                                    return dtx.executeSql('INSERT INTO SAMPLE_TABLE (MESSAGE) VALUES (?)', ['database message 2']);
                                })
                                .then(function(dtx, result) {
                                    return dtx.executeSql('INSERT INTO SAMPLE_TABLE (MESSAGE) VALUES (?)', ['database message 3']);
                                });
                        }
                    })
                    .then(function() {
                        root.log('finish initialize database');
                    });
            },
            function(error) {
                root.log('fail to initialize database : ' + e);
            });

    });
});
