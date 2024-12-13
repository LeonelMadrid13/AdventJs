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

:: Prompt the user for the folder name
set /p folderName="Enter the folder name: "

:: Check if the folder name is empty
if "%folderName%"=="" (
    echo Folder name cannot be empty!
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

:: Create the JavaScript file with the same name as the folder
echo "day%folderName%" > "day%folderName%.js"

:: Create a README.md file
(
    echo ```javascript
    echo "day%folderName%"
    echo ```
) > README.md

:: Success message
echo Folder "%targetFolder%" with a JavaScript file and README.md has been created successfully!

endlocal
