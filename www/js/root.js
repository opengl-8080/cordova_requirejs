define(['jquery'], function($) {
    return {
        log: function(message) {
            // weinre console is not work!!
            $('#console').append(message + '<br>');
        },

        deviceready: function(callback) {
            var _this = this;
            document.addEventListener('deviceready', function() {
                try {
                    callback();
                } catch (e) {
                    _this.log('error : ' + e);
                }
            });
        },

        deferredTransaction: function(tx) {
            var _this = this;
            return new DeferredTransaction(tx);

            function DeferredTransaction(tx) {
                this.executeSql = function(sql, params) {
                    _this.log('execute sql : ' + sql);

                    var d = new $.Deferred();

                    tx.executeSql(
                        sql,
                        params || [],
                        function(tx, result) {
                            d.resolve(new DeferredTransaction(tx), result);
                        },
                        function(tx, result) {
                            d.reject(new DeferredTransaction(tx), result);
                        }
                    );

                    return d.promise();
                };
            }
        }
    };
});
