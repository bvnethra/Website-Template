@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script for Windows
@REM ----------------------------------------------------------------------------

@if "%DEBUG%" == "" @echo off
@classworlds.conf.location=%CLASSWORLDS_CONF%

set ERROR_CODE=0

@REM Set local scope for the variables with windows NT script engine
if "%OS%"=="Windows_NT" @setlocal

if NOT "%JAVACMD%"=="" goto gotJavacmd
if NOT "%JAVA_HOME%"=="" goto gotJavaHome

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.
echo.
goto error

:gotJavaHome
if exist "%JAVA_HOME%\bin\java.exe" set JAVACMD="%JAVA_HOME%\bin\java.exe"
if exist "%JAVACMD%" goto gotJavacmd

:gotJavacmd
%JAVACMD% -version >nul 2>&1
if %ERRORLEVEL% == 0 goto execute

:execute
@REM Run java directly if Maven wrapper jar is present or use javac/java
echo Starting Spring Boot Application via Java...
"%JAVA_HOME%\bin\java.exe" -cp "target/*;target/dependency/*" com.example.landingpage.LandingPageApplication
goto end

:error
set ERROR_CODE=1

:end
@endlocal & set ERROR_CODE=%ERROR_CODE%
