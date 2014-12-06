#!/bin/sh
rm ./clockwork-firebug.xpi
clear && zip -r ./clockwork-firebug.xpi ./chrome ./chrome.manifest ./install.rdf ./bootstrap.js && date
