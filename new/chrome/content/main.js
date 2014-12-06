define(
    [
        "firebug/lib/trace",
        "clockwork_firebug/clockwork"
    ],

    function (FBTrace, Clockwork) {
        FBTrace.sysout('main.js');

        return {

            initialize: function () {
                Firebug.registerModule(Clockwork);
            },

            shutdown: function () {
                Firebug.unregisterModule(Clockwork);
            }
        };
    }
);
