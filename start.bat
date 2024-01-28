@echo off

REM Run "npm run build" in the current directory
echo Running npm run build...
npm run build

REM Move the "dist" directory to "../app/" if it exists
IF EXIST dist (
    echo Moving the 'dist' directory to '../app/'...
    move dist "..\back-end\"
)

REM Check if the "views" directory already exists
IF EXIST "..\back-end\views" (
    REM Rename the "dist" directory to "views"
    echo Renaming the 'dist' directory to 'views'...
    rename "..\back-end\dist" "views"
)

REM Run "npm start" in the "/app" directory
echo Running npm start in the '/app' directory...
cd "..\back-end"
npm start

echo Script execution complete.