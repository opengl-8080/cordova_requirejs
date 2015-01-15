define(['jquery'], function($) {
    return {
        log: function(message) {
            // weinre console is not work!!
            $('#console').append(message + '<br>');
            // console.log(message);
        },

        deviceready: function(callback) {
            var root = this;
            document.addEventListener('deviceready', function() {
                try {
                    callback();
                } catch (e) {
                    root.log('error : ' + e);
                }
            });
        },

        deferredTransaction: function(transaction) {
            var root = this;
            exec.first = executeSql;

            return exec;

            function exec(sql, params) {
                return function(exec, result) {
                    return exec.first(sql, params);
                };
            }

            function executeSql(sql, params) {
                var d = new $.Deferred();

                root.log('execute sql : ' + sql + ', params=' + params);

                transaction.executeSql(
                    sql,
                    params || [],
                    function(tx, result) {
                        d.resolve(root.deferredTransaction(tx), result);
                    },
                    function(tx, result) {
                        d.reject(root.deferredTransaction(tx), result);
                    }
                );

                return d.promise();
            }
        }
    };
});
