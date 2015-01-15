define(['root', 'jquery'], function(root, $) {
    root.deviceready(function() {
        root.log('initializing database...');

        root.db = openDatabase('sampledb', '', 'Sample Database', 1024 * 1024 * 10);

        root.db.transaction(
            function(tx) {
                var exec = root.deferredTransaction(tx);

                exec.first('DROP TABLE IF EXISTS SAMPLE_TABLE')
                    .then(exec('CREATE TABLE SAMPLE_TABLE (ID INTEGER PRIMARY KEY, MESSAGE)'))
                    .then(exec('INSERT INTO SAMPLE_TABLE (MESSAGE) VALUES (?)', ['Hoge']))
                    .then(exec('INSERT INTO SAMPLE_TABLE (MESSAGE) VALUES (?)', ['Fuga']))
                    .then(exec('INSERT INTO SAMPLE_TABLE (MESSAGE) VALUES (?)', ['Piyo']))
                    .then(exec('SELECT * FROM SAMPLE_TABLE'))
                    .then(function(exec, result) {
                        root.log('count=' + result.rows.length);
                        return exec.first('DELETE FROM SAMPLE_TABLE WHERE MESSAGE=?', ['Fuga']);
                    })
                    .done(function() {
                        root.log('success to initialize database');
                    })
                    .fail(function(exec, result) {
                        root.log('fail to initialize database : ' + JSON.stringify(result));
                    });
            },
            function(error) {
                root.log('fail to initialize database');
            });

    });
});
