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

        defferedTransaction: function(tx) {
            var _this = this;
            return new DefferedTransaction(tx);

            function DefferedTransaction(tx) {
                this.executeSql = function(sql, params) {
                    _this.log('execute sql : ' + sql);

                    var d = new $.Deferred();

                    tx.executeSql(
                        sql,
                        params || [],
                        function(tx, result) {
                            d.resolve(new DefferedTransaction(tx), result);
                        },
                        function(tx, result) {
                            d.reject(new DefferedTransaction(tx), result);
                        }
                    );

                    return d.promise();
                };
            }
        }
    };
});
