define([
    "jQuery",
    "emby-button",
    "emby-input",
    "scripts/livetvcomponents",
    "paper-icon-button-light",
    "emby-itemscontainer",
    "emby-collapse",
    "emby-select",
    "livetvcss",
    "emby-checkbox",
    "emby-slider",
    "listViewStyle",
    "dashboardcss",
    "detailtablecss"], function () {

    function defineRoute(newRoute) {
        var path = newRoute.path;
        console.log("defining route: " + path);
        newRoute.dictionary = "core";
        Emby.Page.addRoute(path, newRoute);
    }

    console.log("defining core routes");

    // authentication
    defineRoute({
        path: "/selectserver.html",
        autoFocus: false,
        anonymous: true,
        startup: true,
        controller: "selectserver"
    });
    defineRoute({
        path: "/addserver.html",
        autoFocus: false,
        anonymous: true,
        startup: true,
        controller: "addserver"
    });
    defineRoute({
        path: "/login.html",
        autoFocus: false,
        anonymous: true,
        startup: true,
        controller: "loginpage"
    });
    defineRoute({
        path: "/forgotpassword.html",
        anonymous: true,
        startup: true,
        controller: "forgotpassword"
    });
    defineRoute({
        path: "/forgotpasswordpin.html",
        autoFocus: false,
        anonymous: true,
        startup: true,
        controller: "forgotpasswordpin"
    });

    // playback
    defineRoute({
        path: "/nowplaying.html",
        controller: "nowplayingpage",
        autoFocus: false,
        transition: "fade",
        fullscreen: true,
        supportsThemeMedia: true,
        enableMediaControl: false
    });
    defineRoute({
        path: "/videoosd.html",
        transition: "fade",
        controller: "videoosd",
        autoFocus: false,
        type: "video-osd",
        supportsThemeMedia: true,
        fullscreen: true,
        enableMediaControl: false
    });

    // media
    defineRoute({
        path: "/home.html",
        autoFocus: false,
        controller: "home",
        transition: "fade",
        type: "home"
    });
    defineRoute({
        path: "/list.html",
        autoFocus: false,
        controller: "list",
        transition: "fade"
    });
    defineRoute({
        path: "/search.html",
        controller: "searchpage"
    });
    defineRoute({
        path: "/itemdetails.html",
        controller: "itemdetailpage",
        autoFocus: false,
        transition: "fade"
    });
    defineRoute({
        path: "/livetv.html",
        controller: "livetv/livetvsuggested",
        autoFocus: false,
        transition: "fade"
    });
    defineRoute({
        path: "/movies.html",
        autoFocus: false,
        controller: "movies/moviesrecommended",
        transition: "fade"
    });
    defineRoute({
        path: "/music.html",
        controller: "music/musicrecommended",
        autoFocus: false,
        transition: "fade"
    });
    defineRoute({
        path: "/tv.html",
        autoFocus: false,
        controller: "shows/tvrecommended",
        transition: "fade"
    });

    // user
    defineRoute({
        path: "/mypreferencesmenu.html",
        autoFocus: false,
        transition: "fade",
        controller: "user/menu"
    });
    defineRoute({
        path: "/myprofile.html",
        autoFocus: false,
        transition: "fade",
        controller: "user/profile"
    });
    defineRoute({
        path: "/mypreferencesdisplay.html",
        autoFocus: false,
        transition: "fade",
        controller: "user/display"
    });
    defineRoute({
        path: "/mypreferenceshome.html",
        autoFocus: false,
        transition: "fade",
        controller: "user/home"
    });
    defineRoute({
        path: "/mypreferencesplayback.html",
        autoFocus: false,
        transition: "fade",
        controller: "user/playback"
    });
    defineRoute({
        path: "/mypreferencessubtitles.html",
        autoFocus: false,
        transition: "fade",
        controller: "user/subtitles"
    });

    // dashboard
    defineRoute({
        path: "/dashboard.html",
        autoFocus: false,
        roles: "admin",
        controller: "dashboard/dashboard"
    });
    defineRoute({
        path: "/dashboardgeneral.html",
        controller: "dashboard/general",
        autoFocus: false,
        roles: "admin"
    });
    defineRoute({
        path: "/networking.html",
        autoFocus: false,
        roles: "admin",
        controller: "dashboard/networking"
    });
    defineRoute({
        path: "/devices.html",
        autoFocus: false,
        roles: "admin",
        controller: "devices"
    });
    defineRoute({
        path: "/device.html",
        autoFocus: false,
        roles: "admin",
        controller: "device"
    });
    defineRoute({
        path: "/dlnaprofile.html",
        autoFocus: false,
        roles: "admin",
        controller: "dlnaprofile"
    });
    defineRoute({
        path: "/dlnaprofiles.html",
        autoFocus: false,
        roles: "admin",
        controller: "dlnaprofiles"
    });
    defineRoute({
        path: "/dlnasettings.html",
        autoFocus: false,
        roles: "admin",
        controller: "dlnasettings"
    });
    defineRoute({
        path: "/edititemmetadata.html",
        controller: "edititemmetadata",
        autoFocus: false
    });
    defineRoute({
        path: "/encodingsettings.html",
        autoFocus: false,
        roles: "admin",
        controller: "encodingsettings"
    });
    defineRoute({
        path: "/library.html",
        autoFocus: false,
        roles: "admin",
        controller: "medialibrarypage"
    });
    defineRoute({
        path: "/librarydisplay.html",
        autoFocus: false,
        roles: "admin",
        controller: "librarydisplay"
    });
    defineRoute({
        path: "/librarysettings.html",
        autoFocus: false,
        roles: "admin",
        controller: "librarysettings"
    });
    defineRoute({
        path: "/livetvguideprovider.html",
        autoFocus: false,
        roles: "admin",
        controller: "livetvguideprovider"
    });
    defineRoute({
        path: "/livetvsettings.html",
        autoFocus: false,
        controller: "livetvsettings"
    });
    defineRoute({
        path: "/livetvstatus.html",
        autoFocus: false,
        roles: "admin",
        controller: "livetvstatus"
    });
    defineRoute({
        path: "/livetvtuner.html",
        autoFocus: false,
        roles: "admin",
        controller: "livetvtuner"
    });
    defineRoute({
        path: "/log.html",
        roles: "admin",
        controller: "dashboard/logs"
    });
    defineRoute({
        path: "/metadataimages.html",
        autoFocus: false,
        roles: "admin",
        controller: "metadataimagespage"
    });
    defineRoute({
        path: "/metadatanfo.html",
        autoFocus: false,
        roles: "admin",
        controller: "metadatanfo"
    });
    defineRoute({
        path: "/notificationsetting.html",
        autoFocus: false,
        roles: "admin",
        controller: "dashboard/notifications/notification"
    });
    defineRoute({
        path: "/notificationsettings.html",
        controller: "dashboard/notifications/notifications",
        autoFocus: false,
        roles: "admin"
    });
    defineRoute({
        path: "/playbackconfiguration.html",
        autoFocus: false,
        roles: "admin",
        controller: "playbackconfiguration"
    });
    defineRoute({
        path: "/addplugin.html",
        autoFocus: false,
        roles: "admin",
        controller: "dashboard/plugins/add"
    });
    defineRoute({
        path: "/availableplugins.html",
        autoFocus: false,
        roles: "admin",
        controller: "dashboard/plugins/available"
    });
    defineRoute({
        path: "/installedplugins.html",
        autoFocus: false,
        roles: "admin",
        controller: "dashboard/plugins/installed"
    });
    defineRoute({
        path: "/scheduledtask.html",
        autoFocus: false,
        roles: "admin",
        controller: "dashboard/scheduledtasks/scheduledtask"
    });
    defineRoute({
        path: "/scheduledtasks.html",
        autoFocus: false,
        roles: "admin",
        controller: "dashboard/scheduledtasks/scheduledtasks"
    });
    defineRoute({
        path: "/serveractivity.html",
        autoFocus: false,
        roles: "admin",
        controller: "serveractivity"
    });
    defineRoute({
        path: "/apikeys.html",
        autoFocus: false,
        roles: "admin",
        controller: "apikeys"
    });
    defineRoute({
        path: "/streamingsettings.html",
        autoFocus: false,
        roles: "admin",
        controller: "streamingsettings"
    });
    defineRoute({
        path: "/useredit.html",
        autoFocus: false,
        roles: "admin",
        controller: "useredit"
    });
    defineRoute({
        path: "/userlibraryaccess.html",
        autoFocus: false,
        roles: "admin",
        controller: "userlibraryaccess"
    });
    defineRoute({
        path: "/usernew.html",
        autoFocus: false,
        roles: "admin",
        controller: "usernew"
    });
    defineRoute({
        path: "/userparentalcontrol.html",
        autoFocus: false,
        roles: "admin",
        controller: "userparentalcontrol"
    });
    defineRoute({
        path: "/userpassword.html",
        autoFocus: false,
        controller: "userpasswordpage"
    });
    defineRoute({
        path: "/userprofiles.html",
        autoFocus: false,
        roles: "admin",
        controller: "userprofilespage"
    });

    // plugins
    defineRoute({
        path: "/configurationpage",
        autoFocus: false,
        enableCache: false,
        enableContentQueryString: true,
        roles: "admin"
    });

    // startup wizard
    defineRoute({
        path: "/wizardremoteaccess.html",
        autoFocus: false,
        anonymous: true,
        controller: "wizardremoteaccess"
    });
    defineRoute({
        path: "/wizardfinish.html",
        autoFocus: false,
        anonymous: true,
        controller: "wizardfinishpage"
    });
    defineRoute({
        path: "/wizardlibrary.html",
        autoFocus: false,
        anonymous: true,
        controller: "medialibrarypage"
    });
    defineRoute({
        path: "/wizardsettings.html",
        autoFocus: false,
        anonymous: true,
        controller: "wizardsettings"
    });
    defineRoute({
        path: "/wizardstart.html",
        autoFocus: false,
        anonymous: true,
        controller: "wizardstart"
    });
    defineRoute({
        path: "/wizarduser.html",
        controller: "wizarduserpage",
        autoFocus: false,
        anonymous: true
    });

    // root
    defineRoute({
        path: "/",
        isDefaultRoute: true,
        autoFocus: false
    });
    defineRoute({
        path: "/index.html",
        autoFocus: false,
        isDefaultRoute: true
    });
});
