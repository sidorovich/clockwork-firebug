FBL.ns(function() { with (FBL) {

    Firebug.clockworkTab = extend(Firebug.Module, {

        // --------------------- INITIALIZE EXTENSION ----------------------

        initialize: function() {
            Firebug.NetMonitor.NetInfoBody.addListener(this);
        },

        shutdown: function() {
            Firebug.NetMonitor.NetInfoBody.removeListener(this);
        },

        initTabBody: function(infoBox, file) {
            var self = this;
            self.infoBox = infoBox;
            if (self.isClockworkResponse(file)) {
                Firebug.NetMonitor.NetInfoBody.appendTab(infoBox, "Clockwork", "Clockwork");
            }
        },

        destroyTabBody: function(infoBox, file) {},

        updateTabBody: function(infoBox, file, context) {
            var self = this;
            var tab = infoBox.selectedTab;

            if (tab.dataPresented || !hasClass(tab, 'netInfoClockworkTab')) {
                return;
            }

            tab.dataPresented = true;

            self.tabBody = getElementByClass(infoBox, 'netInfoClockworkText');

            self.showPreLoader();
            self.loadClockworkData(self.getClockworkDataUrl(file.href));
        },

        addStyleSheet: function(panel) {
            var doc = panel.document;
            if ($('clockworkFirebugStyles', doc)) {
                return;
            }

            var styleSheet = createStyleSheet(doc, 'chrome://clockwork_firebug/skin/classic/clockwork_firebug.css');
            styleSheet.setAttribute('id', 'clockworkFirebugStyles');
            addStyleSheet(doc, styleSheet);
        },

        showPanel: function(browser, panel) {
            if (panel && (panel.name == 'net') || (panel.name == 'console')) {
                this.addStyleSheet(panel);
            }
        },

        // --------------------- RENDERING ----------------------

        showPreLoader: function()
        {
            var self = this;
            Firebug.clockworkTab.Templates.preLoader.replace({}, self.tabBody);
        },

        showClockworkData: function(data)
        {
            var self = this;
            var tpls = Firebug.clockworkTab.Templates;
            tpls.tabs.replace({}, self.tabBody);

            self.appendTab('General information', 'general', tpls.generalInfo, {object: data});

            if (self.isAvailable(data.headers)) {
                self.appendTab('Request headers', 'headers', tpls.requestHeaders, {headers: self.fromKeyValue(data.headers)});
            }

            if (self.isAvailable(data.getData)) {
                self.appendTab('GET parameters', 'get-data', tpls.twoColumnsTable, {items: self.fromKeyValue(data.getData, true)});
            }

            if (self.isAvailable(data.postData)) {
                self.appendTab('POST parameters', 'post-data', tpls.twoColumnsTable, {items: self.fromKeyValue(data.postData, true)});
            }

            self.showTimeLineData(data);

            if (self.isAvailable(data.log)) {
                self.appendTab('Log', 'log', tpls.log, {logs: data.log});
            }

            if (self.isAvailable(data.databaseQueries)) {
                self.appendTab('Database queries', 'dbqueries', tpls.databaseQueries, {queries: data.databaseQueries});
            }

            if (self.isAvailable(data.cookies)) {
                self.appendTab('Cookies', 'cookies', tpls.twoColumnsTable, {items: self.fromKeyValue(data.cookies)});
            }

            self.showSessionData(data);
            self.activateDefaultTab();
        },

        appendTab: function (tabName, tabId, contentTemplate, contentData)
        {
            var self = this;
            var ulTab = self.tabBody.firstChild.firstChild;
            var contentTab = self.tabBody.firstChild.firstChild.nextSibling;
            Firebug.clockworkTab.Templates.tabLink.append({object: {tabId: tabId, title: tabName}}, ulTab);
            Firebug.clockworkTab.Templates.tabBlock.append({object: {id: tabId}}, contentTab);
            contentTemplate.append(contentData, contentTab.lastChild);
        },

        showTimeLineData: function(data)
        {
            var self = this;

            if (self.isAvailable(data.timelineData)) {
                var timeLines = [];
                var totalStart = data.timelineData.total.start * 1000;
                var totalDuration = data.timelineData.total.duration;
                var classNumber = 1;

                for (var name in data.timelineData) {
                    if (data.timelineData.hasOwnProperty(name)) {
                        var line = data.timelineData[name];
                        line.class = (name == 'total') ? 'total' : 'line' + (classNumber++).toString();
                        line.time = ((line.duration * 100) / totalDuration).toFixed(2);
                        line.left = (((line.start * 1000 - totalStart) * 100) / totalDuration).toFixed(2);
                        timeLines.push(line);
                        if (classNumber > 5) classNumber = 1;
                    }
                }

                self.appendTab('Timeline', 'timeline', Firebug.clockworkTab.Templates.timeline, {timeLines: timeLines})
            }
        },

        showSessionData: function(data)
        {
            var self = this;
            if (self.isAvailable(data.sessionData)) {
                var session = self.fromKeyValue(data.sessionData, true);
                self.appendTab('Session data', 'session', Firebug.clockworkTab.Templates.twoColumnsTable, {items: session});
            }
        },

        activateDefaultTab: function()
        {
            var self = this;
            setClass(self.tabBody.firstChild.firstChild.firstChild, 'active');
            setClass(self.tabBody.firstChild.firstChild.nextSibling.firstChild, 'active');
        },

        // --------------------- TOOLS ----------------------

        isAvailable: function(value) {
            return ((typeof value !== 'undefined') && (Object.keys(value).length || value.length));
        },

        isClockworkResponse: function(response)
        {
            var self = this;
            return response.responseHeaders.some(function(element) {
                return (
                    (typeof element.name == 'string')
                    && (element.name.toLowerCase() == 'x-clockwork-id')
                    && (self.clockworkId = element.value)
                );
            });
        },

        getClockworkDataUrl: function(url)
        {
            var self = this;
            var clockworkDataUrl = '';
            var requestData = /^([^:]*):\/{2,3}([^\/]*)/.exec(url);
            if (requestData) {
                clockworkDataUrl = requestData[1] + '://' + requestData[2] + '/__clockwork/' + self.clockworkId;
            }
            return clockworkDataUrl;
        },

        loadClockworkData: function(url)
        {
            var self = this;
            var request = new XMLHttpRequest();

            request.open('GET', url, true);
            request.onload = function() {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        self.showClockworkData(JSON.parse(request.responseText));
                    } else {
                        // todo: add error reporting
                        console.log(request.statusText);
                    }
                }
            };
            request.send(null);
        },

        fromKeyValue: function(data, withJSON)
        {
            var result = [];
            for (var name in data) {
                if (data.hasOwnProperty(name)) {
                    var value = ((typeof data[name] != 'string') && withJSON)
                        ? JSON.stringify(data[name]) : data[name];
                    // todo: add pretty JSON viewer
                    result.push({name: name, value: value});
                }
            }
            return result;
        }
    });

    Firebug.registerModule(Firebug.clockworkTab);

}});
