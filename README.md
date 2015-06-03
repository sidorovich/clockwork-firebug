Clockwork for Firebug
=====================

Clockwork for Firebug is a Firebug extension for PHP development, extending Firebug with a new panel providing all kinds of information useful for debugging and profiling your PHP scripts, including information on request, headers, GET and POST data, cookies, session data, database queries, routes, visualisation of application runtime and more.

Clockwork includes out of the box support for Laravel 4 and Slim 2 based applications, you can add support for any other or a custom framework via an extensible API.

This is only client-side component!
[Server-side component is here](http://github.com/itsgoingd/clockwork)

**Not a Firefox/Firebug user?**

Check out:

- [Clockwork for Chrome](https://github.com/itsgoingd/clockwork-chrome)
- [Clockwork for command-line](https://github.com/ptrofimov/clockwork-cli)
- [Web app version of Clockwork](http://github.com/itsgoingd/clockwork-web)

![](http://s30.postimg.org/hh9qav7kx/clockwork_firebug_timeline.png)

![](http://s30.postimg.org/wjcbaowf5/clockwork_firebug_log.png)

## Installation

1. To use this extension you need to install a [server-side component](http://github.com/itsgoingd/clockwork).

2. Install Firebug from [http://addons.mozilla.org/](https://addons.mozilla.org/firefox/addon/firebug/)

3. Install Clockwork for Firebug from [http://addons.mozilla.org/](https://addons.mozilla.org/ru/firefox/addon/clockwork-for-firebug/)

OR

1. Copy or checkout this repository to your computer, open [Addons manager](about:addons), select "Install Add-on From File..." and set path to install.rdf in base directory or builded XPI file

For build own XPI-file run ```ant``` in base directory (see build.xml for details)

2. Download packed XPI-file from my [Google Drive](https://drive.google.com/file/d/0B0oH5QtMFjKKbS1oRG0tT1hhc1E/view?usp=sharing) and manually install with Addons manager

## Using

This plugin will monitor all requests from browser and draw own additional tab in Firebug on Console and NET tabs.
  
If response have Clockwork headers you will see tab Clockwork (like on screenshots).

Click tabs for check any information what you need

## TODO

1. Use new bootstrapped Firebug API (branch: bootstrapped)

2. Add highlight for SQL syntax
 
3. Add pretty JSON-viewer

4. Get data from another Request with Clockwork Id

## License

Copyright (c) 2014 Pavel Sidorovich <p.sidorovich@gmail.com>

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
