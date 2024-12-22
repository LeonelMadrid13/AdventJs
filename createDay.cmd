@echo off
setlocal

:: Prompt the user for the year
set /p year="Enter the year: "

:: Check if the year is empty
if "%year%"=="" (
    echo Year cannot be empty!
    exit /b
)

:: Create the year folder if it doesn't exist
if not exist "%year%" (
    mkdir "%year%"
    if not exist "%year%" (
        echo Failed to create year folder "%year%".
        exit /b
    )
)

:: Prompt the user for the day number
set /p folderName="Enter the day number: "

:: Check if the day number is empty
if "%folderName%"=="" (
    echo Day number cannot be empty!
    exit /b
)

:: Create the project folder inside the year folder
set "targetFolder=%year%\day%folderName%"
mkdir "%targetFolder%"
if not exist "%targetFolder%" (
    echo Failed to create folder "%targetFolder%".
    exit /b
)

:: Navigate into the target folder
cd "%targetFolder%"

:: Create the JavaScript file named index.js
echo // Script for day%folderName% > "index.js"

:: Create a README.md file with a JavaScript code block
(
    echo ```javascript
    echo // Content for day%folderName%
    echo ```
) > README.md

:: Success message
echo Folder "%targetFolder%" with index.js and README.md has been created successfully!

endlocal
