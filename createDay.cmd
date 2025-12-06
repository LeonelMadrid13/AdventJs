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

:: Create the TypeScript file named index.ts
echo // Script for day%folderName% > "index.ts"

:: Run the Deno scraper to generate README.md
echo Fetching challenge data from adventjs.dev...
deno run --allow-net ..\..\adventjs-scraper.ts %year% %folderName% > README.md

:: Check if scraper was successful
if %ERRORLEVEL% NEQ 0 (
    echo Failed to fetch challenge data. Creating fallback README.md...
    (
        echo # Challenge Day %folderName%
        echo.
        echo ```javascript
        echo // Content for day%folderName%
        echo ```
    ) > README.md
)

:: Success message
echo Folder "%targetFolder%" with index.ts and README.md has been created successfully!
echo cd %targetFolder%

endlocal