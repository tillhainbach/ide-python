'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const childProcess = require("child_process");

function open(opts) {
  // opts = objectAssign({wait: true}, opts);
  if (!opts.hasOwnProperty("wait")) {
    opts.wait = true;
  }

  var cmd;
  var appArgs = [];
  var args = [];
  var cpOpts = {};

  if (opts.cwd && typeof opts.cwd === 'string' && opts.cwd.length > 0) {
    cpOpts.cwd = opts.cwd;
  }

  if (opts.env && Object.keys(opts.env).length > 0) {
    cpOpts.env = opts.env;
  }

  if (Array.isArray(opts.app)) {
    appArgs = opts.app.slice(1);
    opts.app = opts.app[0];
  }

  if (process.platform === 'darwin') {
    const sudoPrefix = opts.sudo === true ? 'sudo ' : '';
    cmd = 'osascript';
    args = ['-e', 'tell application "terminal"', '-e', 'activate', '-e', 'do script "' + sudoPrefix + [opts.app].concat(appArgs).join(" ") + '"', '-e', 'end tell'];
  } else if (process.platform === 'win32') {
    cmd = 'cmd';
    args.push('/c', 'start');

    if (opts.wait) {
      args.push('/wait');
    }

    if (opts.app) {
      args.push(opts.app);
    }

    if (appArgs.length > 0) {
      args = args.concat(appArgs);
    }
  } else {
    cmd = 'gnome-terminal';
    const sudoPrefix = opts.sudo === true ? 'sudo ' : '';
    args = ['-x', 'sh', '-c', `"${sudoPrefix}${opts.app}" ${appArgs.join(" ")}`];
  }

  var cp = childProcess.spawn(cmd, args, cpOpts);

  if (opts.wait) {
    return new Promise(function (resolve, reject) {
      cp.once('error', reject);
      cp.once('close', function (code) {
        if (code > 0) {
          reject(new Error('Exited with code ' + code));
          return;
        }

        resolve(cp);
      });
    });
  }

  cp.unref();
  return Promise.resolve(cp);
}

exports.open = open;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9wZW4uanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJjaGlsZFByb2Nlc3MiLCJyZXF1aXJlIiwib3BlbiIsIm9wdHMiLCJoYXNPd25Qcm9wZXJ0eSIsIndhaXQiLCJjbWQiLCJhcHBBcmdzIiwiYXJncyIsImNwT3B0cyIsImN3ZCIsImxlbmd0aCIsImVudiIsImtleXMiLCJBcnJheSIsImlzQXJyYXkiLCJhcHAiLCJzbGljZSIsInByb2Nlc3MiLCJwbGF0Zm9ybSIsInN1ZG9QcmVmaXgiLCJzdWRvIiwiY29uY2F0Iiwiam9pbiIsInB1c2giLCJjcCIsInNwYXduIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbmNlIiwiY29kZSIsIkVycm9yIiwidW5yZWYiXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLEVBQUFBLEtBQUssRUFBRTtBQUFULENBQTdDOztBQUNBLE1BQU1DLFlBQVksR0FBR0MsT0FBTyxDQUFDLGVBQUQsQ0FBNUI7O0FBQ0EsU0FBU0MsSUFBVCxDQUFjQyxJQUFkLEVBQW9CO0FBQ2hCO0FBQ0EsTUFBSSxDQUFDQSxJQUFJLENBQUNDLGNBQUwsQ0FBb0IsTUFBcEIsQ0FBTCxFQUFrQztBQUM5QkQsSUFBQUEsSUFBSSxDQUFDRSxJQUFMLEdBQVksSUFBWjtBQUNIOztBQUNELE1BQUlDLEdBQUo7QUFDQSxNQUFJQyxPQUFPLEdBQUcsRUFBZDtBQUNBLE1BQUlDLElBQUksR0FBRyxFQUFYO0FBQ0EsTUFBSUMsTUFBTSxHQUFHLEVBQWI7O0FBQ0EsTUFBSU4sSUFBSSxDQUFDTyxHQUFMLElBQVksT0FBT1AsSUFBSSxDQUFDTyxHQUFaLEtBQW9CLFFBQWhDLElBQTRDUCxJQUFJLENBQUNPLEdBQUwsQ0FBU0MsTUFBVCxHQUFrQixDQUFsRSxFQUFxRTtBQUNqRUYsSUFBQUEsTUFBTSxD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RCxJQUFoQyxDQUFELENBQU47QUFDQTtBQUNIOztBQUNESCxRQUFBQSxPQUFPLENBQUNILEVBQUQsQ0FBUDtBQUNILE9BTkQ7QUFPSCxLQVRNLENBQVA7QUFVSDs7QUFDREEsRUFBQUEsRUFBRSxDQUFDUSxLQUFIO0FBQ0EsU0FBT04sT0FBTyxDQUFDQyxPQUFSLENBQWdCSCxFQUFoQixDQUFQO0FBQ0g7O0FBQ0QzQixPQUFPLENBQUNJLElBQVIsR0FBZUEsSUFBZjtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2hpbGRQcm9jZXNzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7XG5mdW5jdGlvbiBvcGVuKG9wdHMpIHtcbiAgICAvLyBvcHRzID0gb2JqZWN0QXNzaWduKHt3YWl0OiB0cnVlfSwgb3B0cyk7XG4gICAgaWYgKCFvcHRzLmhhc093blByb3BlcnR5KFwid2FpdFwiKSkge1xuICAgICAgICBvcHRzLndhaXQgPSB0cnVlO1xuICAgIH1cbiAgICB2YXIgY21kO1xuICAgIHZhciBhcHBBcmdzID0gW107XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgY3BPcHRzID0ge307XG4gICAgaWYgKG9wdHMuY3dkICYmIHR5cGVvZiBvcHRzLmN3ZCA9PT0gJ3N0cmluZycgJiYgb3B0cy5jd2QubGVuZ3RoID4gMCkge1xuICAgICAgICBjcE9wdHMuY3dkID0gb3B0cy5jd2Q7XG4gICAgfVxuICAgIGlmIChvcHRzLmVudiAmJiBPYmplY3Qua2V5cyhvcHRzLmVudikubGVuZ3RoID4gMCkge1xuICAgICAgICBjcE9wdHMuZW52ID0gb3B0cy5lbnY7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KG9wdHMuYXBwKSkge1xuICAgICAgICBhcHBBcmdzID0gb3B0cy5hcHAuc2xpY2UoMSk7XG4gICAgICAgIG9wdHMuYXBwID0gb3B0cy5hcHBbMF07XG4gICAgfVxuICAgIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnZGFyd2luJykge1xuICAgICAgICBjb25zdCBzdWRvUHJlZml4ID0gb3B0cy5zdWRvID09PSB0cnVlID8gJ3N1ZG8gJyA6ICcnO1xuICAgICAgICBjbWQgPSAnb3Nhc2NyaXB0JztcbiAgICAgICAgYXJncyA9IFsnLWUnLCAndGVsbCBhcHBsaWNhdGlvbiBcInRlcm1pbmFsXCInLFxuICAgICAgICAgICAgJy1lJywgJ2FjdGl2YXRlJyxcbiAgICAgICAgICAgICctZScsICdkbyBzY3JpcHQgXCInICsgc3Vkb1ByZWZpeCArIFtvcHRzLmFwcF0uY29uY2F0KGFwcEFyZ3MpLmpvaW4oXCIgXCIpICsgJ1wiJyxcbiAgICAgICAgICAgICctZScsICdlbmQgdGVsbCddO1xuICAgIH1cbiAgICBlbHNlIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKSB7XG4gICAgICAgIGNtZCA9ICdjbWQnO1xuICAgICAgICBhcmdzLnB1c2goJy9jJywgJ3N0YXJ0Jyk7XG4gICAgICAgIGlmIChvcHRzLndhaXQpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaCgnL3dhaXQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5hcHApIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaChvcHRzLmFwcCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFwcEFyZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgYXJncyA9IGFyZ3MuY29uY2F0KGFwcEFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjbWQgPSAnZ25vbWUtdGVybWluYWwnO1xuICAgICAgICBjb25zdCBzdWRvUHJlZml4ID0gb3B0cy5zdWRvID09PSB0cnVlID8gJ3N1ZG8gJyA6ICcnO1xuICAgICAgICBhcmdzID0gWycteCcsICdzaCcsICctYycsIGBcIiR7c3Vkb1ByZWZpeH0ke29wdHMuYXBwfVwiICR7YXBwQXJncy5qb2luKFwiIFwiKX1gXTtcbiAgICB9XG4gICAgdmFyIGNwID0gY2hpbGRQcm9jZXNzLnNwYXduKGNtZCwgYXJncywgY3BPcHRzKTtcbiAgICBpZiAob3B0cy53YWl0KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBjcC5vbmNlKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICAgICAgICBjcC5vbmNlKCdjbG9zZScsIGZ1bmN0aW9uIChjb2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvZGUgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0V4aXRlZCB3aXRoIGNvZGUgJyArIGNvZGUpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXNvbHZlKGNwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY3AudW5yZWYoKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNwKTtcbn1cbmV4cG9ydHMub3BlbiA9IG9wZW47XG47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vcGVuLmpzLm1hcCJdfQ==