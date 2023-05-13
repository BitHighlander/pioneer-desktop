#!/bin/bash

# Open Steam with error logging
open -a Steam 2> /tmp/steam-errors.log

# Check the exit status of the open command and provide proper error handling
if [ $? -eq 0 ]; then
    echo "Steam opened successfully."
else
    echo "Error opening Steam."
    echo "Error log:"
    cat /tmp/steam-errors.log
fi

# Remove temporary error log file
rm /tmp/steam-errors.log