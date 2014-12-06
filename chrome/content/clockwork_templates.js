FBL.ns(function() { with (FBL) {

    // --------------------- VIEW TEMPLATES ----------------------

    Firebug.clockworkTab.Templates = domplate(Firebug.Rep, {
        preLoader: DIV({class: 'cwfbPreLoader'}),

        tabs: DIV({class: 'cwfbTabs'},
            UL({class: 'cwfbTabLinks', id: 'cwfbTabHeaderPlace'}),
            DIV({class: 'cwfbTabContent', id: 'cwfbTabContentPlace'})
        ),

        tabLink: LI(A({_tabId: 'cwfb-tab-$object.tabId', onclick: '$selectTab'}, '$object.title')),

        tabBlock: DIV({class: 'cwfbTab', id: 'cwfb-tab-$object.id'}),

        generalInfo: TABLE({class: 'cwfbTableParams'},
            TBODY(
                TR(TD({class: 'name'}, 'Path'),          TD({class: 'value'}, '$object.uri')),
                TR(TD({class: 'name'}, 'Controller'),    TD({class: 'value'}, '$object.controller')),
                TR(TD({class: 'name'}, 'Method'),        TD({class: 'value'}, '$object.method')),
                TR(TD({class: 'name'}, 'Status'),        TD({class: 'value'}, '$object.responseStatus')),
                TR(TD({class: 'name'}, 'Request time'),  TD({class: 'value'}, '$object.responseDuration|formatTimeMs')),
                TR(TD({class: 'name'}, 'Database time'), TD({class: 'value'}, '$object.databaseDuration|formatTimeMs')),
                TR(TD({class: 'name'}, 'Clockwork ID'),  TD({class: 'value'}, '$object.id'))
            )
        ),

        requestHeaders: TABLE({class: 'cwfbTableParams'},
            TBODY(
                FOR('item', 'headers',
                    TR(
                        TD({class: 'name'},  '$item.name|capitalizeHeaders'),
                        TD({class: 'value'}, '$item.value')
                    )
                )
            )
        ),

        timeline: TABLE({class: 'cwfbTableParams cwfbTimeLines'},
            TBODY(
                TR(TH('Description'), TH('Duration'), TH('Timeline')),
                FOR('item', 'timeLines',
                    TR(
                        TD('$item.description'),
                        TD('$item.duration|formatTimeMs'),
                        TD({class: 'timeLine'},
                            DIV({class: 'innerTimeLine $item.class', style: 'min-width: $item.time%; margin-left: $item.left%;'})
                        )
                    )
                )
            )
        ),

        log: TABLE({class: 'cwfbTableParams'},
            TBODY(
                TR(TH('Time'), TH('Level'), TH('Message')),
                FOR('item', 'logs',
                    TR({class: 'cwfbLogLevel-$item.level'},
                        TD('$item.time|formatTimestamp'),
                        TD('$item.level|capitalizeHeaders'),
                        TD({class: 'value'}, '$item.message')
                    )
                )
            )
        ),

        databaseQueries: TABLE({class: 'cwfbTableParams'},
            TBODY(
                TR(TH('Connection'), TH('Query'), TH('Duration')),
                FOR('query', 'queries',
                    TR(
                        TD({class: 'name'}, '$query.connection'),
                        TD({class: 'value'}, '$query.query'),
                        // todo: add pretty-sql
                        TD('$query.duration|formatTimeMs')
                    )
                )
            )
        ),

        twoColumnsTable: TABLE({class: 'cwfbTableParams'},
            TBODY(
                FOR('item', 'items',
                    TR(
                        TD({class: 'name'}, '$item.name'),
                        TD({class: 'value'}, '$item.value')
                    )
                )
            )
        ),

        // --------------------- VIEW HELPERS ----------------------

        formatTimeMs: function(value) {
            return (value > 1000) ? (value / 1000).toFixed(3) + ' s' : value.toFixed(3) + ' ms';
        },

        capitalizeHeaders: function(value) {
            return value.split('-').map(function(val){return val.charAt(0).toUpperCase() + val.slice(1)}).join('-');
        },

        formatTimestamp: function(value) {
            var datetime = new Date(value * 1000);
            return [datetime.getHours(), datetime.getMinutes(), datetime.getSeconds()].join(':') + '.' + datetime.getMilliseconds();
        },

        selectTab: function(event) {
            var current =  event.target.parentNode;
            var tabId = event.target.tabId;
            if (!hasClass(current, 'active')) {
                var tabLinks = current.parentNode.childNodes;
                for (q = 0; q < tabLinks.length; q++) {
                    removeClass(tabLinks[q], 'active');
                }

                setClass(current, 'active');

                var tabBlocks = current.parentNode.nextSibling.childNodes;
                for (q = 0; q < tabBlocks.length; q++) {
                    if (tabBlocks[q].id == tabId) {
                        setClass(tabBlocks[q], 'active');
                    } else {
                        removeClass(tabBlocks[q], 'active');
                    }
                }
            }
        }

    });

}});
