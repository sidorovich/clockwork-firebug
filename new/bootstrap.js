const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

var installPath;

// ********************************************************************************************* //
// Firefox Bootstrap API

function install(data, reason) {}
function uninstall(data, reason) {}
function startup(data, reason) { installPath = data.installPath; firebugStartup(); }
function shutdown(data, reason) { firebugShutdown(); }

function isFirebugLoaded()
{
    try
    {
        Cu.import("resource://firebug/loader.js");
        // Cu.import("resource://firebug/prefLoader.js");
        return true;
    }
    catch (e)
    {
    }

    return false;
}

// ********************************************************************************************* //
// Firebug Bootstrap API

function firebugStartup()
{
    if (!isFirebugLoaded()) return;

    FirebugLoader.registerBootstrapScope(this);
}

function firebugShutdown()
{
    try
    {
        Cu.import("resource://firebug/loader.js");
        FirebugLoader.unregisterBootstrapScope(this);
    }
    catch (e)
    {
        Cu.reportError(e);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

function topWindowLoad(win) {}
function topWindowUnload(win) {}

function firebugFrameLoad(Firebug)
{
    Firebug.registerTracePrefix("clocworkFirebug;", "DBG_CLOCKWORKFIREBUG", true,
        "chrome://clockwork_firebug/skin/clockwork_firebug.css");

    var config = {id: "a93eb4d8-6c38-11e4-adfd-2f571e5d46b0"};
    Firebug.registerExtension("clockwork_firebug", config);
}

function firebugFrameUnload(Firebug)
{
    if (!Firebug.isInitialized) return;

    Firebug.unregisterExtension("clockwork_firebug");
    Firebug.unregisterTracePrefix('clockworkFirebug;');
}

// ********************************************************************************************* //
