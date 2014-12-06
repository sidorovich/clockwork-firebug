define(
    [
        "firebug/lib/trace",
        "firebug/lib/lib"
    ],

    function (FBTrace, FBL) {

        FBTrace.sysout('clockwork.js');

        var ClockworkModule = function ClockworkModule(){};

        ClockworkModule.prototype = FBL.extend(Firebug.Module, {

            initialize: function(owner) {
                Firebug.Module.initialize.apply(this, arguments);

                this.netListener = new NetListener();
                Firebug.NetMonitor.addListener(this.netListener);
            },

            shutdown: function() {
                Firebug.Module.shutdown.apply(this, arguments);

                Firebug.NetMonitor.removeListener(this.netListener);
            }
        });


        function NetListener(outputStream) {}

        NetListener.prototype =
        {
            onResponse: function(context, file) {
                FBTrace.sysout('clockwork; netListener.onResponse; ' + (file ? file.href : ''));
            }
        };

        return ClockworkModule;
    }
);
